import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | staplers', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:staplers');
    assert.ok(route);
  });
});
