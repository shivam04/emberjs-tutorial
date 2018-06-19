import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('papers',{path: '/about/'});
  this.route('staplers',{path: '/my-staplers/'});
  this.route('page-not-found',{path: '/*wildcard'});
});

export default Router;
