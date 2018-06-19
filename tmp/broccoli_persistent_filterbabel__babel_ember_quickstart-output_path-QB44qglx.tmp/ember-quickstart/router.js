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
    this.route('papers');
    this.route('staplers');
  });

  exports.default = Router;
});