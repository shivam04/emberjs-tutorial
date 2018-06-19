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