'use strict';

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
define('ember-quickstart/tests/integration/components/fruit-list-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | fruit-list', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "EGPmYYXH",
        "block": "{\"symbols\":[],\"statements\":[[1,[20,\"fruit-list\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "UCUcwYyF",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"fruit-list\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define('ember-quickstart/tests/integration/components/office-stapler-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | office-stapler', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "ArfFCxri",
        "block": "{\"symbols\":[],\"statements\":[[1,[20,\"office-stapler\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "yZ8eh5rp",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"office-stapler\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define('ember-quickstart/tests/integration/components/template-names-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | template-names', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "q5eikCWl",
        "block": "{\"symbols\":[],\"statements\":[[1,[20,\"template-names\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "/6aq0DFa",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"template-names\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define('ember-quickstart/tests/test-helper', ['ember-quickstart/app', 'ember-quickstart/config/environment', '@ember/test-helpers', 'ember-qunit'], function (_app, _environment, _testHelpers, _emberQunit) {
  'use strict';

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));

  (0, _emberQunit.start)();
});
define('ember-quickstart/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('integration/components/fruit-list-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/fruit-list-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/office-stapler-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/office-stapler-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/template-names-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/template-names-test.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/application-test.js should pass ESLint\n\n');
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
define('ember-quickstart/tests/unit/controllers/application-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:application');
      assert.ok(controller);
    });
  });
});
define('ember-quickstart/tests/unit/routes/papers-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | papers', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:papers');
      assert.ok(route);
    });
  });
});
define('ember-quickstart/tests/unit/routes/staplers-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | staplers', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:staplers');
      assert.ok(route);
    });
  });
});
define('ember-quickstart/config/environment', [], function() {
  var prefix = 'ember-quickstart';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('ember-quickstart/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
