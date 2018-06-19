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