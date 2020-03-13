const fetch = require('node-fetch');
const config = require('../config/config');

const postToSlack = async (user, photo, count) => {
  const { webhookURL } = config;

  const data = JSON.stringify({
    'blocks': [
      {
        'type': 'section',
        'text': {
          'type': 'mrkdwn',
          'text': `*Reto Cumplido* \n ${user} \n Cursos concluidos en Platzi: ${count}`,
        },
        'accessory': {
          'type': 'image',
          'image_url': photo,
          'alt_text': user,
        },
      },
    ],
  });

  console.log(`*Reto Cumplido* \n ${user} \n Cursos concluidos en Platzi: ${count}`);
/*
  await fetch(webhookURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: data,
  }).then((response) => response); */
};

module.exports = postToSlack;
