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