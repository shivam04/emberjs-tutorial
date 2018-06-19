define('ember-quickstart/models/book', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    title: _emberData.default.attr('string'),
    author: _emberData.default.attr('string'),
    year: _emberData.default.attr('date')
  });
});