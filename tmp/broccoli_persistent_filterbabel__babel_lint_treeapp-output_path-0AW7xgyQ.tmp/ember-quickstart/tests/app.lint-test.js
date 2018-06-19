define('ember-quickstart/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('components/fruit-list.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/fruit-list.js should pass ESLint\n\n8:23 - Use import { w } from \'@ember/string\'; instead of using Ember.String.w (ember/new-module-imports)\n8:23 - \'Ember\' is not defined. (no-undef)\n8:43 - Do not use this.attrs (ember/no-attrs-in-components)');
  });

  QUnit.test('components/template-names.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/template-names.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });
});