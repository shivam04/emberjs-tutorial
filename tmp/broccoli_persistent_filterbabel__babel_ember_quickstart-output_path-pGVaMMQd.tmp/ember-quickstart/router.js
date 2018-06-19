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