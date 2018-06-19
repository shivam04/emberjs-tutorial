define('ember-quickstart/routes/application', ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Ember.Route.extend({
		model() {
			return this.get('store').findAll('book') /*[{title:"sasa",author:"asdasdas",date:"28-03-2018"},
                                            {title:"sasa",author:"asdasdas",date:"28-03-2018"},
                                            {title:"sasa",author:"asdasdas",date:"28-03-2018"},
                                            {title:"sasa",author:"asdasdas",date:"28-03-2018"},
                                            {title:"sasa",author:"asdasdas",date:"28-03-2018"}
                                            ]*/;
		}
	});
});