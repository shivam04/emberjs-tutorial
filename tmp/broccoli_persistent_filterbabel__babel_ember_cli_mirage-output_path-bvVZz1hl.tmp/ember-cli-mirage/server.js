define('ember-cli-mirage/server', ['exports', 'ember-cli-mirage/utils/inflector', 'ember-cli-mirage/utils/normalize-name', 'ember-cli-mirage/ember-data', 'ember-cli-mirage/utils/ember-data', 'ember-cli-mirage/utils/is-association', 'pretender', 'ember-cli-mirage/db', 'ember-cli-mirage/orm/schema', 'ember-cli-mirage/assert', 'ember-cli-mirage/serializer-registry', 'ember-cli-mirage/route-handler', 'lodash/pick', 'lodash/assign', 'lodash/find', 'lodash/isPlainObject', 'lodash/isInteger'], function (exports, _inflector, _normalizeName, _emberData, _emberData2, _isAssociation, _pretender, _db, _schema, _assert, _serializerRegistry, _routeHandler, _pick2, _assign2, _find2, _isPlainObject2, _isInteger2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.defaultPassthroughs = undefined;


  /**
   * Creates a new Pretender instance.
   *
   * @method createPretender
   * @param {Server} server
   * @return {Object} A new Pretender instance.
   * @public
   */
  function createPretender(server) {
    return new _pretender.default(function () {
      this.passthroughRequest = function (verb, path, request) {
        if (server.shouldLog()) {
          console.log(`Passthrough request: ${verb.toUpperCase()} ${request.url}`);
        }
      };

      this.handledRequest = function (verb, path, request) {
        if (server.shouldLog()) {
          console.groupCollapsed(`Mirage: [${request.status}] ${verb.toUpperCase()} ${request.url}`);
          let { requestBody, responseText } = request;
          let loggedRequest, loggedResponse;

          try {
            loggedRequest = JSON.parse(requestBody);
          } catch (e) {
            loggedRequest = requestBody;
          }

          try {
            loggedResponse = JSON.parse(responseText);
          } catch (e) {
            loggedResponse = responseText;
          }

          console.log({
            request: loggedRequest,
            response: loggedResponse,
            raw: request
          });
          console.groupEnd();
        }
      };

      this.unhandledRequest = function (verb, path) {
        path = decodeURI(path);
        (0, _assert.default)(`Your Ember app tried to ${verb} '${path}',
         but there was no route defined to handle this request.
         Define a route that matches this path in your
         mirage/config.js file. Did you forget to add your namespace?`);
      };
    }, { trackRequests: server.shouldTrackRequests() });
  } /* eslint no-console: 0 */

  const defaultRouteOptions = {
    coalesce: false,
    timing: undefined
  };

  const defaultPassthroughs = ['http://localhost:0/chromecheckurl', // mobile chrome
  'http://localhost:30820/socket.io' // electron
  ];
  exports.defaultPassthroughs = defaultPassthroughs;


  /**
   * Determine if the object contains a valid option.
   *
   * @method isOption
   * @param {Object} option An object with one option value pair.
   * @return {Boolean} True if option is a valid option, false otherwise.
   * @private
   */
  function isOption(option) {
    if (!option || typeof option !== 'object') {
      return false;
    }

    let allOptions = Object.keys(defaultRouteOptions);
    let optionKeys = Object.keys(option);
    for (let i = 0; i < optionKeys.length; i++) {
      let key = optionKeys[i];
      if (allOptions.indexOf(key) > -1) {
        return true;
      }
    }
    return false;
  }

  /**
   * Extract arguments for a route.
   *
   * @method extractRouteArguments
   * @param {Array} args Of the form [options], [object, code], [function, code]
   * [shorthand, options], [shorthand, code, options]
   * @return {Array} [handler (i.e. the function, object or shorthand), code,
   * options].
   * @private
   */
  function extractRouteArguments(args) {
    let [lastArg] = args.splice(-1);
    if (isOption(lastArg)) {
      lastArg = (0, _assign2.default)({}, defaultRouteOptions, lastArg);
    } else {
      args.push(lastArg);
      lastArg = defaultRouteOptions;
    }
    let t = 2 - args.length;
    while (t-- > 0) {
      args.push(undefined);
    }
    args.push(lastArg);
    return args;
  }

  /**
   *
   *
   * @class Server
   * @public
   */
  class Server {

    /**
     * Build the new server object.
     *
     * @constructor
     * @public
     */
    constructor(options = {}) {
      this.config(options);
    }

    config(config = {}) {
      let didOverrideConfig = config.environment && this.environment && this.environment !== config.environment;
      (0, _assert.default)(!didOverrideConfig, 'You cannot modify Mirage\'s environment once the server is created');
      this.environment = config.environment || 'development';

      this._config = config;

      this.timing = this.timing || config.timing || 400;
      this.namespace = this.namespace || config.namespace || '';
      this.urlPrefix = this.urlPrefix || config.urlPrefix || '';
      this.trackRequests = config.trackRequests;

      this._defineRouteHandlerHelpers();

      // Merge models from autogenerated Ember Data models with user defined models
      if (_emberData2.hasEmberData && config.discoverEmberDataModels) {
        let models = {};
        (0, _assign2.default)(models, (0, _emberData.getModels)(), config.models || {});
        config.models = models;
      }

      if (this.db) {
        this.db.registerIdentityManagers(config.identityManagers);
      } else {
        this.db = new _db.default(undefined, config.identityManagers);
      }

      if (this.schema) {
        this.schema.registerModels(config.models);
        this.serializerOrRegistry.registerSerializers(config.serializers || {});
      } else {
        this.schema = new _schema.default(this.db, config.models);
        this.serializerOrRegistry = new _serializerRegistry.default(this.schema, config.serializers);
      }

      let hasFactories = this._hasModulesOfType(config, 'factories');
      let hasDefaultScenario = config.scenarios && config.scenarios.hasOwnProperty('default');

      let didOverridePretenderConfig = config.trackRequests !== undefined && this.pretender;
      (0, _assert.default)(!didOverridePretenderConfig, 'You cannot modify Pretender\'s request tracking once the server is created');
      this.pretender = this.pretender || createPretender(this);

      if (config.baseConfig) {
        this.loadConfig(config.baseConfig);
      }

      if (this.isTest()) {
        if (config.testConfig) {
          this.loadConfig(config.testConfig);
        }

        window.server = this; // TODO: Better way to inject server into test env
      }

      if (this.isTest() && hasFactories) {
        this.loadFactories(config.factories);
      } else if (!this.isTest() && hasDefaultScenario) {
        this.loadFactories(config.factories);
        config.scenarios.default(this);
      } else {
        this.loadFixtures();
      }

      if (config.useDefaultPassthroughs) {
        this._configureDefaultPassthroughs();
      }
    }

    /**
     * Determines if the current environment is the testing environment.
     *
     * @method isTest
     * @return {Boolean} True if the environment is 'test', false otherwise.
     * @public
     */
    isTest() {
      return this.environment === 'test';
    }

    /**
     * Determines if the server should log.
     *
     * @method shouldLog
     * @return The value of this.logging if defined, or false if in the testing environment,
     * true otherwise.
     * @public
     */
    shouldLog() {
      return typeof this.logging !== 'undefined' ? this.logging : !this.isTest();
    }

    /**
     * Determines if the server should track requests.
     *
     * @method shouldTrackRequests
     * @return The value of this.trackRequests if defined, false otherwise.
     * @public
     */
    shouldTrackRequests() {
      return Boolean(this.trackRequests);
    }

    /**
     * Load the configuration given, setting timing to 0 if in the test
     * environment.
     *
     * @method loadConfig
     * @param {Object} config The configuration to load.
     * @public
     */
    loadConfig(config) {
      config.call(this);
      this.timing = this.isTest() ? 0 : this.timing || 0;
    }

    /**
     * Whitelist requests to the specified paths and allow them to pass through
     * your Mirage server to the actual network layer.
     *
     * @method passthrough
     * @param {String} [...paths] Any numer of paths to whitelist
     * @param {Array} options Unused
     * @public
     */
    passthrough(...paths) {
      let verbs = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head'];
      let lastArg = paths[paths.length - 1];

      if (paths.length === 0) {
        // paths = ['http://localhost:7357'];
        paths = ['/**', '/'];
      } else if (Array.isArray(lastArg)) {
        verbs = paths.pop();
      }

      verbs.forEach(verb => {
        paths.forEach(path => {
          let fullPath = this._getFullPath(path);
          this.pretender[verb](fullPath, this.pretender.passthrough);
        });
      });
    }

    /**
     * Load the all or only the specified fixtures into Mirage's database.
     *
     * @method loadFixtures
     * @param {String} [...args] The name of the fixture to load.
     * @public
     */
    loadFixtures(...args) {
      let { fixtures } = this._config;
      if (args.length) {
        let camelizedArgs = args.map(_inflector.camelize);
        fixtures = (0, _pick2.default)(fixtures, ...camelizedArgs);
      }

      this.db.loadData(fixtures);
    }

    /*
      Factory methods
    */

    /**
     * Load factories into Mirage's database.
     *
     * @method loadFactories
     * @param {Object} factoryMap
     * @public
     */
    loadFactories(factoryMap = {}) {
      // Store a reference to the factories
      let currentFactoryMap = this._factoryMap || {};
      this._factoryMap = (0, _assign2.default)(currentFactoryMap, factoryMap);

      // Create a collection for each factory
      Object.keys(factoryMap).forEach(type => {
        let collectionName = (0, _normalizeName.toCollectionName)(type);
        this.db.createCollection(collectionName);
      });
    }

    /**
     * Get the factory for a given type.
     *
     * @method factoryFor
     * @param {String} type
     * @private
     */
    factoryFor(type) {
      let camelizedType = (0, _inflector.camelize)(type);

      if (this._factoryMap && this._factoryMap[camelizedType]) {
        return this._factoryMap[camelizedType];
      }
    }

    build(type, ...traitsAndOverrides) {
      let traits = traitsAndOverrides.filter(arg => arg && typeof arg === 'string');
      let overrides = (0, _find2.default)(traitsAndOverrides, arg => (0, _isPlainObject2.default)(arg));
      let camelizedType = (0, _inflector.camelize)(type);

      // Store sequence for factory type as instance variable
      this.factorySequences = this.factorySequences || {};
      this.factorySequences[camelizedType] = this.factorySequences[camelizedType] + 1 || 0;

      let OriginalFactory = this.factoryFor(type);
      if (OriginalFactory) {
        OriginalFactory = OriginalFactory.extend({});
        let attrs = OriginalFactory.attrs || {};
        this._validateTraits(traits, OriginalFactory, type);
        let mergedExtensions = this._mergeExtensions(attrs, traits, overrides);
        this._mapAssociationsFromAttributes(type, attrs, overrides);
        this._mapAssociationsFromAttributes(type, mergedExtensions);

        let Factory = OriginalFactory.extend(mergedExtensions);
        let factory = new Factory();

        let sequence = this.factorySequences[camelizedType];
        return factory.build(sequence);
      } else {
        return overrides;
      }
    }

    buildList(type, amount, ...traitsAndOverrides) {
      (0, _assert.default)((0, _isInteger2.default)(amount), `second argument has to be an integer, you passed: ${typeof amount}`);

      let list = [];

      for (let i = 0; i < amount; i++) {
        list.push(this.build(type, ...traitsAndOverrides));
      }

      return list;
    }

    create(type, ...options) {
      // When there is a Model defined, we should return an instance
      // of it instead of returning the bare attributes.
      let traits = options.filter(arg => arg && typeof arg === 'string');
      let overrides = (0, _find2.default)(options, arg => (0, _isPlainObject2.default)(arg));
      let collectionFromCreateList = (0, _find2.default)(options, arg => arg && Array.isArray(arg));

      let attrs = this.build(type, ...traits, overrides);
      let modelOrRecord;

      if (this.schema && this.schema[(0, _normalizeName.toCollectionName)(type)]) {
        let modelClass = this.schema[(0, _normalizeName.toCollectionName)(type)];

        modelOrRecord = modelClass.create(attrs);
      } else {
        let collection, collectionName;

        if (collectionFromCreateList) {
          collection = collectionFromCreateList;
        } else {
          collectionName = this.schema ? (0, _normalizeName.toInternalCollectionName)(type) : `_${(0, _inflector.pluralize)(type)}`;
          collection = this.db[collectionName];
        }

        (0, _assert.default)(collection, `You called server.create(${type}) but no model or factory was found. Try \`ember g mirage-model ${type}\`.`);
        modelOrRecord = collection.insert(attrs);
      }

      let OriginalFactory = this.factoryFor(type);
      if (OriginalFactory) {
        OriginalFactory.extractAfterCreateCallbacks({ traits }).forEach(afterCreate => {
          afterCreate(modelOrRecord, this);
        });
      }

      return modelOrRecord;
    }

    createList(type, amount, ...traitsAndOverrides) {
      (0, _assert.default)((0, _isInteger2.default)(amount), `second argument has to be an integer, you passed: ${typeof amount}`);

      let list = [];
      let collectionName = this.schema ? (0, _normalizeName.toInternalCollectionName)(type) : `_${(0, _inflector.pluralize)(type)}`;
      let collection = this.db[collectionName];

      for (let i = 0; i < amount; i++) {
        list.push(this.create(type, ...traitsAndOverrides, collection));
      }

      return list;
    }

    shutdown() {
      this.pretender.shutdown();
      if (this.environment === 'test') {
        window.server = undefined;
      }
    }

    resource(resourceName, { only, except, path } = {}) {
      resourceName = (0, _inflector.pluralize)(resourceName);
      path = path || `/${resourceName}`;
      only = only || [];
      except = except || [];

      if (only.length > 0 && except.length > 0) {
        throw 'cannot use both :only and :except options';
      }

      let actionsMethodsAndsPathsMappings = {
        index: { methods: ['get'], path: `${path}` },
        show: { methods: ['get'], path: `${path}/:id` },
        create: { methods: ['post'], path: `${path}` },
        update: { methods: ['put', 'patch'], path: `${path}/:id` },
        delete: { methods: ['del'], path: `${path}/:id` }
      };

      let allActions = Object.keys(actionsMethodsAndsPathsMappings);
      let actions = only.length > 0 && only || except.length > 0 && allActions.filter(action => except.indexOf(action) === -1) || allActions;

      actions.forEach(action => {
        let methodsWithPath = actionsMethodsAndsPathsMappings[action];

        methodsWithPath.methods.forEach(method => {
          return path === resourceName ? this[method](methodsWithPath.path) : this[method](methodsWithPath.path, resourceName);
        });
      });
    }

    /**
     *
     * @private
     */
    _defineRouteHandlerHelpers() {
      [['get'], ['post'], ['put'], ['delete', 'del'], ['patch'], ['head'], ['options']].forEach(([verb, alias]) => {
        this[verb] = (path, ...args) => {
          let [rawHandler, customizedCode, options] = extractRouteArguments(args);
          return this._registerRouteHandler(verb, path, rawHandler, customizedCode, options);
        };

        if (alias) {
          this[alias] = this[verb];
        }
      });
    }

    _serialize(body) {
      if (typeof body === 'string') {
        return body;
      } else if (body) {
        return JSON.stringify(body);
      } else {
        return '{"error": "not found"}';
      }
    }

    _registerRouteHandler(verb, path, rawHandler, customizedCode, options) {

      let routeHandler = new _routeHandler.default({
        schema: this.schema,
        verb, rawHandler, customizedCode, options, path,
        serializerOrRegistry: this.serializerOrRegistry
      });

      let fullPath = this._getFullPath(path);
      let timing = options.timing !== undefined ? options.timing : () => this.timing;

      return this.pretender[verb](fullPath, request => {
        return new Ember.RSVP.Promise(resolve => {
          Ember.RSVP.Promise.resolve(routeHandler.handle(request)).then(mirageResponse => {
            let [code, headers, response] = mirageResponse;
            resolve([code, headers, this._serialize(response)]);
          });
        });
      }, timing);
    }

    /**
     *
     * @private
     */
    _hasModulesOfType(modules, type) {
      let modulesOfType = modules[type];
      return modulesOfType ? Object.keys(modulesOfType).length > 0 : false;
    }

    /**
     * Builds a full path for Pretender to monitor based on the `path` and
     * configured options (`urlPrefix` and `namespace`).
     *
     * @private
     */
    _getFullPath(path) {
      path = path[0] === '/' ? path.slice(1) : path;
      let fullPath = '';
      let urlPrefix = this.urlPrefix ? this.urlPrefix.trim() : '';
      let namespace = '';

      // if there is a urlPrefix and a namespace
      if (this.urlPrefix && this.namespace) {
        if (this.namespace[0] === '/' && this.namespace[this.namespace.length - 1] === '/') {
          namespace = this.namespace.substring(0, this.namespace.length - 1).substring(1);
        }

        if (this.namespace[0] === '/' && this.namespace[this.namespace.length - 1] !== '/') {
          namespace = this.namespace.substring(1);
        }

        if (this.namespace[0] !== '/' && this.namespace[this.namespace.length - 1] === '/') {
          namespace = this.namespace.substring(0, this.namespace.length - 1);
        }

        if (this.namespace[0] !== '/' && this.namespace[this.namespace.length - 1] !== '/') {
          namespace = this.namespace;
        }
      }

      // if there is a namespace and no urlPrefix
      if (this.namespace && !this.urlPrefix) {
        if (this.namespace[0] === '/' && this.namespace[this.namespace.length - 1] === '/') {
          namespace = this.namespace.substring(0, this.namespace.length - 1);
        }

        if (this.namespace[0] === '/' && this.namespace[this.namespace.length - 1] !== '/') {
          namespace = this.namespace;
        }

        if (this.namespace[0] !== '/' && this.namespace[this.namespace.length - 1] === '/') {
          let namespaceSub = this.namespace.substring(0, this.namespace.length - 1);
          namespace = `/${namespaceSub}`;
        }

        if (this.namespace[0] !== '/' && this.namespace[this.namespace.length - 1] !== '/') {
          namespace = `/${this.namespace}`;
        }
      }

      // if no namespace
      if (!this.namespace) {
        namespace = '';
      }

      // check to see if path is a FQDN. if so, ignore any urlPrefix/namespace that was set
      if (/^https?:\/\//.test(path)) {
        fullPath += path;
      } else {
        // otherwise, if there is a urlPrefix, use that as the beginning of the path
        if (urlPrefix.length) {
          fullPath += urlPrefix[urlPrefix.length - 1] === '/' ? urlPrefix : `${urlPrefix}/`;
        }

        // add the namespace to the path
        fullPath += namespace;

        // add a trailing slash to the path if it doesn't already contain one
        if (fullPath[fullPath.length - 1] !== '/') {
          fullPath += '/';
        }

        // finally add the configured path
        fullPath += path;

        // if we're making a same-origin request, ensure a / is prepended and
        // dedup any double slashes
        if (!/^https?:\/\//.test(fullPath)) {
          fullPath = `/${fullPath}`;
          fullPath = fullPath.replace(/\/+/g, '/');
        }
      }

      return fullPath;
    }

    /**
     *
     * @private
     */
    _configureDefaultPassthroughs() {
      defaultPassthroughs.forEach(passthroughUrl => {
        this.passthrough(passthroughUrl);
      });
    }

    /**
     *
     * @private
     */
    _validateTraits(traits, factory, type) {
      traits.forEach(traitName => {
        if (!factory.isTrait(traitName)) {
          throw new Error(`'${traitName}' trait is not registered in '${type}' factory`);
        }
      });
    }

    /**
     *
     * @private
     */
    _mergeExtensions(attrs, traits, overrides) {
      let allExtensions = traits.map(traitName => {
        return attrs[traitName].extension;
      });
      allExtensions.push(overrides || {});
      return allExtensions.reduce((accum, extension) => {
        return (0, _assign2.default)(accum, extension);
      }, {});
    }

    /**
     *
     * @private
     */
    _mapAssociationsFromAttributes(modelType, attributes, overrides = {}) {
      Object.keys(attributes || {}).filter(attr => {
        return (0, _isAssociation.default)(attributes[attr]);
      }).forEach(attr => {
        let association = attributes[attr];
        let associationName = this._fetchAssociationNameFromModel(modelType, attr);
        let foreignKey = `${(0, _inflector.camelize)(attr)}Id`;
        if (!overrides[attr]) {
          attributes[foreignKey] = this.create(associationName, ...association.traitsAndOverrides).id;
        }
        delete attributes[attr];
      });
    }

    /**
     *
     * @private
     */
    _fetchAssociationNameFromModel(modelType, associationAttribute) {
      let camelizedModelType = (0, _inflector.camelize)(modelType);
      let model = this.schema.modelFor(camelizedModelType);
      if (!model) {
        throw new Error(`Model not registered: ${modelType}`);
      }

      let association = model.class.findBelongsToAssociation(associationAttribute);
      if (!association) {
        throw new Error(`You're using the \`association\` factory helper on the '${associationAttribute}' attribute of your ${modelType} factory, but that attribute is not a \`belongsTo\` association. Read the Factories docs for more information: http://www.ember-cli-mirage.com/docs/v0.3.x/factories/#factories-and-relationships`);
      }
      return (0, _inflector.camelize)(association.modelName);
    }
  }
  exports.default = Server;
});