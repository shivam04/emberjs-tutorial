define('ember-quickstart/mirage/factories/book', ['exports', 'ember-cli-mirage'], function (exports, _emberCliMirage) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _emberCliMirage.Factory.extend({
		title: _emberCliMirage.faker.lorem.sentence,
		author() {
			return _emberCliMirage.faker.name.findName();
		},
		year: _emberCliMirage.faker.date.past
	});
});