module.exports = ({ env }) => ({
  email: {
    provider: 'smtp',
    providerOptions: {
      host: 'smtp.gmail.com', //SMTP Host
      port: 465   , //SMTP Port
      secure: true,
      username: 'tickets.ingsoftware@gmail.com',
      password: 'Tickets123',
      rejectUnauthorized: true,
      requireTLS: true,
      connectionTimeout: 1,
    },
    settings: {
      from: 'tickets.ingsoftware@gmail.com',
      replyTo: 'tickets.ingsoftware@gmail.com',
    },
  },
});
