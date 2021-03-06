define('lodash/defaults', ['exports', 'lodash/_baseRest', 'lodash/eq', 'lodash/_isIterateeCall', 'lodash/keysIn'], function (exports, _baseRest, _eq, _isIterateeCall, _keysIn) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * Assigns own and inherited enumerable string keyed properties of source
   * objects to the destination object for all destination properties that
   * resolve to `undefined`. Source objects are applied from left to right.
   * Once a property is set, additional values of the same property are ignored.
   *
   * **Note:** This method mutates `object`.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @returns {Object} Returns `object`.
   * @see _.defaultsDeep
   * @example
   *
   * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
   * // => { 'a': 1, 'b': 2 }
   */
  var defaults = (0, _baseRest.default)(function (object, sources) {
    object = Object(object);

    var index = -1;
    var length = sources.length;
    var guard = length > 2 ? sources[2] : undefined;

    if (guard && (0, _isIterateeCall.default)(sources[0], sources[1], guard)) {
      length = 1;
    }

    while (++index < length) {
      var source = sources[index];
      var props = (0, _keysIn.default)(source);
      var propsIndex = -1;
      var propsLength = props.length;

      while (++propsIndex < propsLength) {
        var key = props[propsIndex];
        var value = object[key];

        if (value === undefined || (0, _eq.default)(value, objectProto[key]) && !hasOwnProperty.call(object, key)) {
          object[key] = source[key];
        }
      }
    }

    return object;
  });

  exports.default = defaults;
});