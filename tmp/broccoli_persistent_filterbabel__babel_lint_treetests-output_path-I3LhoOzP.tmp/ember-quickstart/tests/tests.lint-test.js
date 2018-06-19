define('ember-quickstart/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('integration/components/fruit-list-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/fruit-list-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/template-names-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/template-names-test.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/papers-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/papers-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/staplers-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/staplers-test.js should pass ESLint\n\n');
  });
});