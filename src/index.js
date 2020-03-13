const prompt = require('prompt');
const getDataFromPlatzi = require('./utils/getDataFromPlatzi');

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
    return 1;
  }

  const { email, password, user } = result;

  if (email && password && user) {
    getDataFromPlatzi(email, password, user);
  } else {
    return 1;
  }
});

prompt.start();
