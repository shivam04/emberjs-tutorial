"use strict";



define('ember-quickstart/app', ['exports', 'ember-quickstart/resolver', 'ember-load-initializers', 'ember-quickstart/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('ember-quickstart/components/fruit-list', ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Ember.Component.extend({
		tagName: "span",
		classNames: ['shivam'],
		init() {
			this._super(...arguments);
			this.arrayOfFruits = Ember.String.w(this.attrs.fruits);
		},
		actions: {
			add(val) {
				this.get('arrayOfFruits').pushObject(val);
			}
		}
	});
});
define('ember-quickstart/components/office-chair', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({});
});
define('ember-quickstart/components/office-stapler', ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Ember.Component.extend({
		num: 100,
		click() {
			this.attrs.pressed();
		}
	});
});
define('ember-quickstart/components/office-supplies', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({});
});
define("ember-quickstart/components/template-names", ["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Ember.Component.extend({
		firstName: "Shivam",
		lastName: "Sinha",
		actions: {
			press(val) {
				alert('hello! ' + val);
			}
		}
	});
});
define('ember-quickstart/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define('ember-quickstart/controllers/application', ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Ember.Controller.extend({
		actions: {
			pressed() {
				alert('You clicked this');
			}
		}

	});
});
define('ember-quickstart/helpers/app-version', ['exports', 'ember-quickstart/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;

    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('ember-quickstart/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('ember-quickstart/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('ember-quickstart/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'ember-quickstart/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  let name, version;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('ember-quickstart/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('ember-quickstart/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('ember-quickstart/initializers/export-application-global', ['exports', 'ember-quickstart/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define("ember-quickstart/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('ember-quickstart/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('ember-quickstart/router', ['exports', 'ember-quickstart/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('papers', { path: '/about/' });
    this.route('staplers', { path: '/my-staplers/' });
    this.route('page-not-found', { path: '/*wildcard' });
  });

  exports.default = Router;
});
define('ember-quickstart/routes/papers', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('ember-quickstart/routes/staplers', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('ember-quickstart/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define("ember-quickstart/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Z0DlxvUn", "block": "{\"symbols\":[\"office\",\"prop\",\"prop\"],\"statements\":[[6,\"h2\"],[10,\"id\",\"title\"],[8],[0,\"Welcome to ember\"],[9],[0,\"\\n\"],[4,\"office-stapler\",null,[[\"pressed\"],[[26,\"action\",[[21,0,[]],\"pressed\"],null]]],{\"statements\":[[0,\"\\tFavourite Number:\"],[1,[21,3,[\"mynum\"]],false],[6,\"br\"],[8],[9],[0,\"\\n\\tColor:\"],[1,[21,3,[\"color\"]],false],[6,\"br\"],[8],[9],[0,\"\\n    Number of Staples:\"],[1,[21,3,[\"staples\"]],false],[6,\"br\"],[8],[9],[0,\"\\n\\tInside Component\\n\"]],\"parameters\":[3]},null],[0,\"\\n\"],[6,\"h1\"],[8],[0,\"Second Exmaple\"],[9],[0,\"\\n\"],[4,\"office-supplies\",null,null,{\"statements\":[[0,\"\\t\"],[4,\"component\",[[21,1,[\"stapler\"]]],null,{\"statements\":[[6,\"br\"],[8],[9],[0,\"\\n\\t\\t\"],[1,[21,2,[\"mynum\"]],false],[6,\"br\"],[8],[9],[0,\"\\n\\t\\t\"],[1,[21,2,[\"color\"]],false],[6,\"br\"],[8],[9],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"\\t\"],[1,[21,1,[\"chair\"]],false],[6,\"br\"],[8],[9],[0,\"\\n\"]],\"parameters\":[1]},null]],\"hasEval\":false}", "meta": { "moduleName": "ember-quickstart/templates/application.hbs" } });
});
define("ember-quickstart/templates/components/fruit-list", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "nsMBsD4G", "block": "{\"symbols\":[\"fruit\"],\"statements\":[[1,[26,\"input\",null,[[\"value\"],[[22,[\"textValue\"]]]]],false],[0,\"\\n\"],[6,\"button\"],[3,\"action\",[[21,0,[]],\"add\",[22,[\"textValue\"]]]],[8],[0,\"add\"],[9],[6,\"br\"],[8],[9],[0,\"\\n\"],[4,\"each\",[[22,[\"arrayOfFruits\"]]],null,{\"statements\":[[0,\"fruit: \"],[1,[21,1,[]],false],[6,\"br\"],[8],[9],[0,\"\\n\"]],\"parameters\":[1]},null]],\"hasEval\":false}", "meta": { "moduleName": "ember-quickstart/templates/components/fruit-list.hbs" } });
});
define("ember-quickstart/templates/components/office-chair", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "26Uqb5Eg", "block": "{\"symbols\":[\"&default\"],\"statements\":[[13,1],[0,\"\\nThis is chair.\"]],\"hasEval\":false}", "meta": { "moduleName": "ember-quickstart/templates/components/office-chair.hbs" } });
});
define("ember-quickstart/templates/components/office-stapler", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "fe2wcP/R", "block": "{\"symbols\":[\"&default\"],\"statements\":[[13,1,[[26,\"hash\",null,[[\"color\",\"staples\",\"mynum\"],[\"red\",\"250\",[22,[\"num\"]]]]]]],[6,\"br\"],[8],[9],[0,\"\\n\\nThis is a stapler.\"]],\"hasEval\":false}", "meta": { "moduleName": "ember-quickstart/templates/components/office-stapler.hbs" } });
});
define("ember-quickstart/templates/components/office-supplies", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "uGUtbO0F", "block": "{\"symbols\":[\"&default\"],\"statements\":[[13,1,[[26,\"hash\",null,[[\"stapler\",\"chair\"],[[26,\"component\",[\"office-stapler\"],null],[26,\"component\",[\"office-chair\"],null]]]]]]],\"hasEval\":false}", "meta": { "moduleName": "ember-quickstart/templates/components/office-supplies.hbs" } });
});
define("ember-quickstart/templates/components/template-names", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "aUw+DnNC", "block": "{\"symbols\":[\"&default\"],\"statements\":[[0,\"Hello \"],[1,[20,\"firstName\"],false],[0,\" \"],[1,[20,\"lastName\"],false],[6,\"br\"],[8],[9],[0,\"\\n\\n\"],[1,[26,\"input\",null,[[\"value\"],[[22,[\"myValue\"]]]]],false],[6,\"br\"],[8],[9],[0,\"\\n\"],[6,\"button\"],[3,\"action\",[[21,0,[]],\"press\",[22,[\"myValue\"]]]],[8],[0,\"Press Me\"],[9],[0,\"\\n\"],[13,1]],\"hasEval\":false}", "meta": { "moduleName": "ember-quickstart/templates/components/template-names.hbs" } });
});
define("ember-quickstart/templates/page-not-found", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "pFAbNxN8", "block": "{\"symbols\":[],\"statements\":[[6,\"h1\"],[8],[0,\"Not Found\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "ember-quickstart/templates/page-not-found.hbs" } });
});
define("ember-quickstart/templates/papers", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "1MgIaHvP", "block": "{\"symbols\":[],\"statements\":[[1,[20,\"outlet\"],false],[0,\"\\nThis is the papers route.\"]],\"hasEval\":false}", "meta": { "moduleName": "ember-quickstart/templates/papers.hbs" } });
});
define("ember-quickstart/templates/staplers", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "rAFhX9v8", "block": "{\"symbols\":[],\"statements\":[[1,[20,\"outlet\"],false],[0,\"\\nThis is the staplers route.\"]],\"hasEval\":false}", "meta": { "moduleName": "ember-quickstart/templates/staplers.hbs" } });
});


define('ember-quickstart/config/environment', [], function() {
  var prefix = 'ember-quickstart';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("ember-quickstart/app")["default"].create({"name":"ember-quickstart","version":"0.0.0+fd3cf63a"});
}
//# sourceMappingURL=ember-quickstart.map
