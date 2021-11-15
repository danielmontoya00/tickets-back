'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

   async create(ctx) {
     try {
      let entity;
      if (ctx.is('multipart')) {
        const { data, files } = parseMultipartData(ctx);
        entity = await strapi.services.categorias.create(data, { files });
      } else {
        entity = await strapi.services.categorias.create(ctx.request.body);
      }
      return sanitizeEntity(entity, { model: strapi.models.categorias });
     } catch(e) {
      let entity = {  statusCode: 400,
        error :   "Bad Request",
        message :   e
      };
      ctx.response.status = 400;

      return entity;
     }

  },

  /**
   * Update a record.
   *
   * @return {Object}
   */

   async update(ctx) {
    try {
    const { id } = ctx.params;

    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.categorias.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.categorias.update({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.categorias });
    } catch(e) {
      let entity = {  statusCode: 400,
        error :   "Bad Request",
        message :   e
      };
      ctx.response.status = 400;

      return entity;
     }
  },
};
