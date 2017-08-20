'use strict';

const url = require('url');
const querystring = require('querystring');

module.exports = (request, callback) => {
  request.url = url.parse(request.url);
  request.url.query = querystring.parse(request.url.query);

  if (request.method === 'POST' || request.method === 'PUT') {
    let text = '';
    request.on('data', (data) => {
      text += data.toString();
    });
    request.on('end', (error) => {
      request.text = text;
      try {
        request.body = JSON.parse(text);
        callback(null);
      } catch (error) {
        callback(error);
      }
    });
    request.on('error', (error) => {
      request.body = {};
      request.text = '';
      callback(error);
    });
  } else {
    request.text = '';
    request.body = {};
    callback(null);
  }
};
