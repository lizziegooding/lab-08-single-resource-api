'use strict';

const requestParse = require('./request-parse.js');

const routes = {
  GET: {},
  PUT: {},
  POST: {},
  DELETE: {},
};

const router = module.exports = {};

router.get = (pathname, callback) => {
  routes.GET[pathname] = callback;
};

router.post = (pathname, callback) => {
  routes.POST[pathname] = callback;
};

router.delete = (pathname, callback) => {
  routes.DELETE[pathname] = callback;
};

router.put = (pathname, callback) => {
  routes.PUT[pathname] = callback;
};

router.route = (request, response) => {
  requestParse(request, (error) => {
    if (error) {
      response.writeHead(400);
      response.end();
      return;
    }
    let routeHandler = routes[request.method][request.url.pathname];
    if (routeHandler) {
      routeHandler(request, response);
      response.end();
      return;
    } else {
      response.writeHead(404);
      response.end();
      return;
    }
  });
};
