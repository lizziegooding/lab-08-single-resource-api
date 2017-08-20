'use strict';

const http = require('http');
const router = require('./router.js');
const uuid = require('uuid');

var simpleResource = {};

function Note(id, name, content) {
  this.id = id;
  this.name = name;
  this.content = content;
}

router.post('/api/simple-resource', (request, response) => {
  if(!request.body.content){
    response.writeHead(400);
    response.end();
    return;
  }

  let note = new Note(uuid.v1(), 'Lizzie', request.body.content);

  simpleResource[note.id] = note;

  response.writeHead(200, {
    'Content-Type': 'application/json',
  });
  response.write(JSON.stringify(note));
  response.end();
});

router.get('/api/simple-resource', (request, response) => {
  if(!request.url.query.id){
    response.writeHead(400);
    response.end();
    return;
  }

  if(!simpleResource[request.url.query.id]){
    response.writeHead(404);
    response.end();
    return;
  }

  response.writeHead(200, {
    'Content-Type': 'application/json',
  });
  response.write(JSON.stringify(simpleResource[request.url.query.id]));
  response.end();
  return;
});

router.delete('/api/simple-resource', (request, response) => {
  if(!request.url.query.id){
    response.writeHead(400);
    response.end();
    return;
  }

  if(!simpleResource[request.url.query.id]){
    response.writeHead(404);
    response.end();
    return;
  }
  delete simpleResource[request.url.query.id];
  response.writeHead(204, {
    'Content-Type': 'application/json',
  });
  response.write(JSON.stringify(response.body));
  response.end();
  return;
});

router.put('/api/simple-resource', (request, response) => {
  if(!request.url.query.id || !request.body.content){
    response.writeHead(400);
    response.end();
    return;
  }

  if(!simpleResource[request.url.query.id]){
    response.writeHead(404);
    response.end();
    return;
  }

  simpleResource[request.url.query.id] = new Note(request.url.query.id, 'Lizzie', request.body.content);
  response.writeHead(202, {
    'Content-Type': 'application/json',
  });
  response.write(JSON.stringify(simpleResource[request.url.query.id]));
  response.end();
});

module.exports = http.createServer(router.route);
