define('ember-cli-mirage/orm/collection', ['exports', 'ember-cli-mirage/assert', 'lodash/invokeMap'], function (exports, _assert, _invokeMap2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  /**
   * An array of models, returned from one of the schema query
   * methods (all, find, where). Knows how to update and destroy its models.
   * @class Collection
   * @constructor
   * @public
   */
  class Collection {
    constructor(modelName, models = []) {
      (0, _assert.default)(modelName && typeof modelName === 'string', 'You must pass a `modelName` into a Collection');

      this.modelName = modelName;
      this.models = models;
    }

    /**
     * Number of models in the collection.
     *
     * @property length
     * @type Number
     * @public
     */
    get length() {
      return this.models.length;
    }

    /**
     * Updates each model in the collection (persisting immediately to the db).
     * @method update
     * @param key
     * @param val
     * @return this
     * @public
     */
    update(...args) {
      (0, _invokeMap2.default)(this.models, 'update', ...args);

      return this;
    }

    /**
     * Destroys the db record for all models in the collection.
     * @method destroy
     * @return this
     * @public
     */
    destroy() {
      (0, _invokeMap2.default)(this.models, 'destroy');

      return this;
    }

    /**
     * Saves all models in the collection.
     * @method save
     * @return this
     * @public
     */
    save() {
      (0, _invokeMap2.default)(this.models, 'save');

      return this;
    }

    /**
     * Reloads each model in the collection.
     * @method reload
     * @return this
     * @public
     */
    reload() {
      (0, _invokeMap2.default)(this.models, 'reload');

      return this;
    }

    /**
     * Adds a model to this collection
     *
     * @method add
     * @return this
     * @public
     */
    add(model) {
      this.models.push(model);

      return this;
    }

    /**
     * Removes a model to this collection
     *
     * @method remove
     * @return this
     * @public
     */
    remove(model) {
      let [match] = this.models.filter(m => m.toString() === model.toString());
      if (match) {
        let i = this.models.indexOf(match);
        this.models.splice(i, 1);
      }

      return this;
    }

    /**
     * Checks if the collection includes the model
     *
     * @method includes
     * @return boolean
     * @public
     */
    includes(model) {
      return this.models.filter(m => m.toString() === model.toString()).length > 0;
    }

    /**
     * @method filter
     * @param f
     * @return {Collection}
     * @public
     */
    filter(f) {
      let filteredModels = this.models.filter(f);

      return new Collection(this.modelName, filteredModels);
    }

    /**
     * @method sort
     * @param f
     * @return {Collection}
     * @public
     */
    sort(f) {
      let sortedModels = this.models.concat().sort(f);

      return new Collection(this.modelName, sortedModels);
    }

    /**
     * @method slice
     * @param {Integer} begin
     * @param {Integer} end
     * @return {Collection}
     * @public
     */
    slice(...args) {
      let slicedModels = this.models.slice(...args);

      return new Collection(this.modelName, slicedModels);
    }

    /**
     * @method mergeCollection
     * @param collection
     * @return this
     * @public
     */
    mergeCollection(collection) {
      this.models = this.models.concat(collection.models);

      return this;
    }

    /**
     * Simple string representation of the collection and id.
     * @method toString
     * @return {String}
     * @public
     */
    toString() {
      return `collection:${this.modelName}(${this.models.map(m => m.id).join(',')})`;
    }
  }
  exports.default = Collection;
});