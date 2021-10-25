'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

 const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

   async create(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.tickets.create(data, { files });
    } else {
      entity = await strapi.services.tickets.create(ctx.request.body);
    }

    console.log(entity);

    // const user = await strapi.query('user', 'users-permissions').findOne({ id: ctx.request.body.user });
    // const categoria = await strapi.services.categorias.findOne({ id });

    const emailTemplate = {
      subject: `Ticket Asignado: ${ entity.categoria.nombre }`,
      text: `Se le ha asignado un ticket con la siguiente información:\nCategoria: ${ entity.categoria.nombre }\nDescripción: ${ entity.descripcion }\n Con fecha limite el ${ entity.fechaLimite }`,
      html: `Se le ha asignado un ticket con la siguiente información:<br>Categoria: ${ entity.categoria.nombre }<br>Descripción: ${ entity.descripcion }<br>Con fecha limite el ${ entity.fechaLimite }`,
    };

    await strapi.plugins.email.services.email.sendTemplatedEmail(
      {
        to: entity.user.email,
        from: 'Tickets'
      },
      emailTemplate
    );

    return sanitizeEntity(entity, { model: strapi.models.ticket });
  },
};
