define('ember-cli-mirage/serializers/json-api-serializer', ['exports', 'ember-cli-mirage/serializer', 'ember-cli-mirage/utils/inflector', 'lodash/get', 'lodash'], function (exports, _serializer, _inflector, _get2, _lodash) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const JSONAPISerializer = _serializer.default.extend({

    keyForModel(modelName) {
      return (0, _inflector.dasherize)(modelName);
    },

    keyForCollection(modelName) {
      return (0, _inflector.dasherize)(modelName);
    },

    keyForAttribute(attr) {
      return (0, _inflector.dasherize)(attr);
    },

    keyForRelationship(key) {
      return (0, _inflector.dasherize)(key);
    },

    getHashForPrimaryResource(resource) {
      this._createRequestedIncludesGraph(resource);

      let resourceHash = this.getHashForResource(resource);
      let hashWithRoot = { data: resourceHash };
      let addToIncludes = this.getAddToIncludesForResource(resource);

      return [hashWithRoot, addToIncludes];
    },

    getHashForIncludedResource(resource) {
      let serializer = this.serializerFor(resource.modelName);
      let hash = serializer.getHashForResource(resource);
      let hashWithRoot = { included: this.isModel(resource) ? [hash] : hash };
      let addToIncludes = [];

      if (!this.hasQueryParamIncludes()) {
        addToIncludes = this.getAddToIncludesForResource(resource);
      }

      return [hashWithRoot, addToIncludes];
    },

    getHashForResource(resource) {
      let hash;

      if (this.isModel(resource)) {
        hash = this._getResourceObjectForModel(resource);
      } else {
        hash = resource.models.map(m => this._getResourceObjectForModel(m));
      }

      return hash;
    },

    /*
      Returns a flat unique list of resources that need to be added to includes
    */
    getAddToIncludesForResource(resource) {
      let relationshipPaths;

      if (this.hasQueryParamIncludes()) {
        relationshipPaths = this.request.queryParams.include.split(',');
      } else {
        let serializer = this.serializerFor(resource.modelName);
        relationshipPaths = serializer.getKeysForIncluded();
      }

      return this.getAddToIncludesForResourceAndPaths(resource, relationshipPaths);
    },

    getAddToIncludesForResourceAndPaths(resource, relationshipPaths) {
      let includes = [];

      relationshipPaths.forEach(path => {
        let relationshipNames = path.split('.');
        let newIncludes = this.getIncludesForResourceAndPath(resource, ...relationshipNames);
        includes.push(newIncludes);
      });

      return (0, _lodash.default)(includes).flatten().compact().uniqBy(m => m.toString()).value();
    },

    getIncludesForResourceAndPath(resource, ...names) {
      let nameForCurrentResource = (0, _inflector.camelize)(names.shift());
      let includes = [];
      let modelsToAdd = [];

      if (this.isModel(resource)) {
        let relationship = resource[nameForCurrentResource];

        if (this.isModel(relationship)) {
          modelsToAdd = [relationship];
        } else if (this.isCollection(relationship)) {
          modelsToAdd = relationship.models;
        }
      } else {
        resource.models.forEach(model => {
          let relationship = model[nameForCurrentResource];

          if (this.isModel(relationship)) {
            modelsToAdd.push(relationship);
          } else if (this.isCollection(relationship)) {
            modelsToAdd = modelsToAdd.concat(relationship.models);
          }
        });
      }

      includes = includes.concat(modelsToAdd);

      if (names.length) {
        modelsToAdd.forEach(model => {
          includes = includes.concat(this.getIncludesForResourceAndPath(model, ...names));
        });
      }

      return includes;
    },

    _getResourceObjectForModel(model) {
      let attrs = this._attrsForModel(model, true);
      delete attrs.id;

      let hash = {
        type: this.typeKeyForModel(model),
        id: model.id,
        attributes: attrs
      };

      return this._maybeAddRelationshipsToResourceObjectForModel(hash, model);
    },

    _maybeAddRelationshipsToResourceObjectForModel(hash, model) {
      let relationships = model.associationKeys.reduce((relationships, key) => {
        let relationship = model[key];
        let relationshipKey = this.keyForRelationship(key);
        let relationshipHash = {};

        if (this.hasLinksForRelationship(model, key)) {
          let serializer = this.serializerFor(model.modelName);
          let links = serializer.links(model);
          relationshipHash.links = links[key];
        }

        if (this.alwaysIncludeLinkageData || this._relationshipIsIncludedForModel(key, model)) {
          let data = null;
          if (this.isModel(relationship)) {
            data = {
              type: this.typeKeyForModel(relationship),
              id: relationship.id
            };
          } else if (this.isCollection(relationship)) {
            data = relationship.models.map(model => {
              return {
                type: this.typeKeyForModel(model),
                id: model.id
              };
            });
          }
          relationshipHash.data = data;
        }

        if (!_lodash.default.isEmpty(relationshipHash)) {
          relationships[relationshipKey] = relationshipHash;
        }

        return relationships;
      }, {});

      if (!_lodash.default.isEmpty(relationships)) {
        hash.relationships = relationships;
      }

      return hash;
    },

    hasLinksForRelationship(model, relationshipKey) {
      let serializer = this.serializerFor(model.modelName);
      let links;
      if (serializer.links) {
        links = serializer.links(model);

        return links[relationshipKey] != null;
      }
    },

    /*
      This code (and a lot of this serializer) need to be re-worked according to
      the graph logic...
    */
    _relationshipIsIncludedForModel(relationshipKey, model) {
      if (this.hasQueryParamIncludes()) {
        let graph = this.request._includesGraph;
        let graphKey = this._graphKeyForModel(model);

        // Find the resource in the graph
        let graphResource;

        // Check primary data
        if (graph.data[graphKey]) {
          graphResource = graph.data[graphKey];

          // Check includes
        } else if (graph.included[(0, _inflector.dasherize)((0, _inflector.pluralize)(model.modelName))]) {
          graphResource = graph.included[(0, _inflector.dasherize)((0, _inflector.pluralize)(model.modelName))][graphKey];
        }

        // If the model's in the graph, check if relationshipKey should be included
        return graphResource && graphResource.relationships && graphResource.relationships.hasOwnProperty((0, _inflector.dasherize)(relationshipKey));
      } else {
        let relationshipPaths = this.getKeysForIncluded();

        return relationshipPaths.includes(relationshipKey);
      }
    },

    /*
      This is needed for _relationshipIsIncludedForModel - see the note there for
      more background.
       If/when we can refactor this serializer, the logic in this method would
      probably be the basis for the new overall json/graph creation.
    */
    _createRequestedIncludesGraph(primaryResource, secondaryResource = null) {
      let graph = {
        data: {}
      };

      if (this.isModel(primaryResource)) {
        let primaryResourceKey = this._graphKeyForModel(primaryResource);
        graph.data[primaryResourceKey] = {};

        this._addPrimaryModelToRequestedIncludesGraph(graph, primaryResource);
      } else if (this.isCollection(primaryResource)) {
        primaryResource.models.forEach(model => {
          let primaryResourceKey = this._graphKeyForModel(model);
          graph.data[primaryResourceKey] = {};

          this._addPrimaryModelToRequestedIncludesGraph(graph, model);
        });
      }

      // Hack :/ Need to think of a better palce to put this if
      // refactoring json:api serializer.
      this.request._includesGraph = graph;
    },

    _addPrimaryModelToRequestedIncludesGraph(graph, model) {
      let graphKey = this._graphKeyForModel(model);

      if (this.hasQueryParamIncludes()) {
        let queryParamIncludes = this.getQueryParamIncludes();
        queryParamIncludes.split(',')
        // includesPath is post.comments
        .forEach(includesPath => {
          graph.data[graphKey].relationships = graph.data[graphKey].relationships || {};
          let relationshipKeys = includesPath.split('.');
          let relationshipKey = relationshipKeys[0];
          let relationship = model[(0, _inflector.camelize)(relationshipKey)];
          let relationshipData;

          if (this.isModel(relationship)) {
            relationshipData = this._graphKeyForModel(relationship);
          } else if (this.isCollection(relationship)) {
            relationshipData = relationship.models.map(this._graphKeyForModel);
          } else {
            relationshipData = null;
          }

          graph.data[graphKey].relationships[relationshipKey] = relationshipData;

          if (relationship) {
            this._addResourceToRequestedIncludesGraph(graph, relationship, relationshipKeys.slice(1));
          }
        });
      }
    },

    _addResourceToRequestedIncludesGraph(graph, resource, relationshipNames) {
      let collectionName = (0, _inflector.dasherize)((0, _inflector.pluralize)(resource.modelName));
      graph.included = graph.included || {};
      graph.included[collectionName] = graph.included[collectionName] || {};

      let models = this.isCollection(resource) ? resource.models : [resource];
      models.forEach(model => {
        this._addModelToRequestedIncludesGraph(graph, model, relationshipNames);
      });
    },

    _addModelToRequestedIncludesGraph(graph, model, relationshipNames) {
      let collectionName = (0, _inflector.dasherize)((0, _inflector.pluralize)(model.modelName));
      let resourceKey = this._graphKeyForModel(model);
      graph.included[collectionName][resourceKey] = graph.included[collectionName][resourceKey] || {};

      if (relationshipNames.length) {
        this._addResourceRelationshipsToRequestedIncludesGraph(graph, collectionName, resourceKey, model, relationshipNames);
      }
    },

    /*
      Lot of the same logic here from _addPrimaryModelToRequestedIncludesGraph, could refactor & share
    */
    _addResourceRelationshipsToRequestedIncludesGraph(graph, collectionName, resourceKey, model, relationshipNames) {
      graph.included[collectionName][resourceKey].relationships = graph.included[collectionName][resourceKey].relationships || {};

      let relationshipName = relationshipNames[0];
      let relationship = model[(0, _inflector.camelize)(relationshipName)];
      let relationshipData;

      if (this.isModel(relationship)) {
        relationshipData = this._graphKeyForModel(relationship);
      } else if (this.isCollection(relationship)) {
        relationshipData = relationship.models.map(this._graphKeyForModel);
      }
      graph.included[collectionName][resourceKey].relationships[relationshipName] = relationshipData;

      if (relationship) {
        this._addResourceToRequestedIncludesGraph(graph, relationship, relationshipNames.slice(1));
      }
    },

    _graphKeyForModel(model) {
      return `${model.modelName}:${model.id}`;
    },

    getQueryParamIncludes() {
      return (0, _get2.default)(this, 'request.queryParams.include');
    },

    hasQueryParamIncludes() {
      return !!this.getQueryParamIncludes();
    },

    typeKeyForModel(model) {
      return (0, _inflector.dasherize)((0, _inflector.pluralize)(model.modelName));
    },

    getCoalescedIds(request) {
      let ids = request.queryParams && request.queryParams['filter[id]'];
      if (typeof ids === 'string') {
        return ids.split(',');
      }
      return ids;
    }
  });

  JSONAPISerializer.prototype.alwaysIncludeLinkageData = false;

  exports.default = JSONAPISerializer;
});