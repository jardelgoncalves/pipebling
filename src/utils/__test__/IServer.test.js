import { describe, it, expect } from '@jest/globals';
import { IServer } from '../IServer';
import { NotImplementedException } from '../NotImplementedException';

describe('IServer unit test', () => {
  const server = new IServer();
  it('should return NotImplementedException to init method', async () => {
    await expect(server.init()).rejects.toThrow(NotImplementedException);
  });

  it('should return NotImplementedException to start method', async () => {
    await expect(server.start()).rejects.toThrow(NotImplementedException);
  });

  it('should return NotImplementedException to close method', async () => {
    await expect(server.close()).rejects.toThrow(NotImplementedException);
  });

  it('should return NotImplementedException to close method', async () => {
    await expect(server.close()).rejects.toThrow(NotImplementedException);
  });

  it('should return true if the getApp method returns a value other than null', () => {
    expect(server.getApp()).toBeDefined();
  });

  it('should return true if the bodyParser property is different from null', () => {
    expect(server.bodyParser).toBeDefined();
  });
});
