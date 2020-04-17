const prompt = require('prompt');
const config = require('./config');
const getDataFromPlatzi = require('./utils/getDataFromPlatzi');

const { email, username, password } = config;

if (!email && !username && !password) {

  const schema = {
    properties: {
      email: {
        message: 'Ingresa tu correo',
        required: true,
      },
      password: {
        hidden: true,
      },
      user: {
        message: 'Ingresa tu usuario Platzi iniciando con @ (Respeta mayúsculas y minúsculas)',
        required: true,
      },
    },
  };

  prompt.get(schema, (err, result) => {
    if (err) {
      throw (err);
    }

    const { email, password, user } = result;

    if (email && password && user) {
      process.stdout.write('Analizando...\n');
      getDataFromPlatzi(email, password, user);
    }
  });

  prompt.start();
} else {
  process.stdout.write('Analizando...\n');

  getDataFromPlatzi(email, password, username);
}

