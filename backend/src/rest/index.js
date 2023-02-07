const Router = require('@koa/router');

const installItemRouter = require('./_item');
const installListRouter = require('./_list.js');
const installUserRouter = require('./_user');
const installHealthRouter = require('./_health');

/**
 * Install all routes in the given Koa application.
 *
 * @param {Koa} app - The Koa application.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: '/api',
  });
  
  installItemRouter(router);
  installListRouter(router);
  installHealthRouter(router);
  installUserRouter(router);


  app.use(router.routes()).use(router.allowedMethods());
};