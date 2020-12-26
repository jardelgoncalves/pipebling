import MongooseError from 'mongoose/lib/error/mongooseError';

export class IRepository {
  /**
   * @param {Array.<import('mongoose/lib/model')>} models All Models
   * @param {import('mongoose/lib/model')} model Model instance
   */
  constructor(models, model) {
    this.models = models;
    this.Model = model;
  }

  /**
   * @param {Object} filter filter params
   * @return {Promise<Array.<import('mongoose/lib/query')>>} Query
   */
  async find(query) {
    return this.Model.find(query || {});
  }

  /**
   * @param {Object} filter filter params
   * @return {Promise<import('mongoose/lib/query')|null>} Query
   */
  async findOne(filter) {
    return this.Model.findOne(filter || {});
  }

  /**
   * @param {import('mongoose/lib/schema/objectid')} id ObjectId params
   * @return {Promise<import('mongoose/lib/query')|null>} Query
   */
  async findById(id) {
    return this.Model.findById(id);
  }

  /**
   * @param {Object} data data object to persist on database
   * @return {Promise<import('mongoose/lib/query')>} Query
   */
  async persist(data = {}) {
    const enitity = new this.Model(data);
    await enitity.save();

    return enitity;
  }

  /**
   * @param {Object} filter filter params
   * @param {Object} data data object to persist on database
   * @return {Promise<import('mongoose/lib/query')>} Query
   */
  async update(filter, data) {
    const entity = await this.findOne(filter);
    if (!entity) throw new MongooseError('Document not found');

    entity.set(data);
    await entity.save();

    return entity;
  }

  /**
   * @param {Object} filter filter params
   * @return {void}
   */
  async destroy(filter) {
    const entity = await this.findOne(filter);
    if (!entity) throw new MongooseError('Document not found');

    await entity.delete();
  }
}
