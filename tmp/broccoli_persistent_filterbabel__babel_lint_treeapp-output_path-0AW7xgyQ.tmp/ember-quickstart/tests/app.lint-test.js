define('ember-quickstart/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('components/fruit-list.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/fruit-list.js should pass ESLint\n\n9:30 - Do not use this.attrs (ember/no-attrs-in-components)');
  });

  QUnit.test('components/office-stapler.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/office-stapler.js should pass ESLint\n\n6:8 - Do not use this.attrs (ember/no-attrs-in-components)');
  });

  QUnit.test('components/template-names.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/template-names.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/application.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/papers.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/papers.js should pass ESLint\n\n');
  });

  QUnit.test('routes/staplers.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/staplers.js should pass ESLint\n\n');
  });
});