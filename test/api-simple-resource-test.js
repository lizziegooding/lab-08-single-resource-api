'use strict';

const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');

let tempNote;

describe('testing simpleResource routes', () => {
  before((done) => {
    server.listen(3000, () => done());
  });
  after((done) => {
    server.close(() => done());
  });

  describe('testing route that hasn\'t been registered', () => {
    it('should respond with a 404 not found', (done) => {
      superagent.post('localhost:3000/api/simple-resource-name')
      .send({content: 'example data'})
      .end((error, response) => {
        expect(response.status).toEqual(404);
        done();
      });
    });
  });

  describe('testing POST /api/simple-resource', () => {
    it('should respond with a note', (done) => {
      superagent.post('localhost:3000/api/simple-resource')
      .send({content: 'example data'})
      .end((error, response) => {
        if (error) return done(error);
        expect(response.status).toEqual(200);
        expect(response.body.id).toExist();
        expect(response.body.content).toEqual('example data');
        tempNote = response.body;
        done();
      });
    });
    it('should respond with a 400 bad request', (done) => {
      superagent.post('localhost:3000/api/simple-resource')
      .send('trouble')
      .end((error, response) => {
        expect(response.status).toEqual(400);
        done();
      });
    });
  });

  describe('testing GET /api/simple-resource', () => {
    it('should respond with a note', (done) => {
      superagent.get(`localhost:3000/api/simple-resource?id=${tempNote.id}`)
      .end((error, response) => {
        if (error) return done(error);
        expect(response.status).toEqual(200);
        expect(response.body.id).toEqual(tempNote.id);
        expect(response.body.content).toEqual('example data');
        tempNote = response.body;
        done();
      });
    });
    it('should respond with a 404 not foud', (done) => {
      superagent.get('localhost:3000/api/simple-resource?id=abc')
      .end((error, response) => {
        expect(response.status).toEqual(404);
        done();
      });
    });
    it('should respond with a 400 bad request', (done) => {
      superagent.get('localhost:3000/api/simple-resource?')
      .end((error, response) => {
        expect(response.status).toEqual(400);
        done();
      });
    });
  });

  describe('testing PUT /api/simple-resource', () => {
    it('should respond with a note', (done) => {
      superagent.put(`localhost:3000/api/simple-resource?id=${tempNote.id}`)
      .send({content: 'new data'})
      .end((error, response) => {
        if (error) return done(error);
        expect(response.status).toEqual(202);
        expect(response.body).toExist();
        expect(response.body.id).toEqual(tempNote.id);
        expect(response.body.content).toEqual('new data');
        tempNote = response.body;
        done();
      });
    });
    it('should respond with a 400 bad request', (done) => {
      superagent.put('localhost:3000/api/simple-resource')
      .send('trouble')
      .end((error, response) => {
        expect(response.status).toEqual(400);
        done();
      });
    });
  });

  describe('testing DELETE /api/simple-resource', () => {
    it('should respond with a note', (done) => {
      superagent.delete(`localhost:3000/api/simple-resource?id=${tempNote.id}`)
      .end((error, response) => {
        if (error) return done(error);
        expect(response.status).toEqual(204);
        expect(response.body).toEqual('');
        // expect(response.body.id).toEqual(tempNote.id);
        // expect(response.body.content).toEqual('new data');
        tempNote = response.body;
        done();
      });
    });
    it('should respond with a 404 bad request', (done) => {
      superagent.delete('localhost:3000/api/simple-resource?id=abc')
      .end((error, response) => {
        expect(response.status).toEqual(404);
        done();
      });
    });
  });
});
// 'c4ccf1e0-8546-11e7-be0a-1131c3774f0a'
// 'c4ca0bb0-8546-11e7-be0a-1131c3774f0a'
