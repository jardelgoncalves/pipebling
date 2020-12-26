import { afterAll, beforeAll } from '@jest/globals';
import { Server } from '@src/server';
import supertest from 'supertest';

let server = null;
beforeAll(async () => {
  server = new Server();
  await server.init();

  global.testRequest = supertest(server.getApp());
});

afterAll(async () => {
  await server.close();
});
