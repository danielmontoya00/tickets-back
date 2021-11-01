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

    const tickets = await strapi.services.tickets.find({
      user: ctx.request.body.user,
      estado: 'asignado'
    });

    if(tickets.length < 2) {
      entity = await strapi.services.tickets.create(ctx.request.body);

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

      return sanitizeEntity(entity, { model: strapi.models.tickets });
    } else {
      return ctx.badRequest(
        null,
        formatError({
          id: 'Ticket.limiteTickets',
          message: 'El usuario ya tiene un limite de tickets asignados sin completar.',
        })
      );
    }
  },
};
