const express = require('express');
const path = require('path');

const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const getData = require('../../lib/index');

const dir = 'db';
const fullPath = path.join(dir, 'corona.json');

// eslint-disable-next-line arrow-parens
const api = async app => {
  const adapter = new FileAsync(fullPath);
  const db = await low(adapter);
  const router = express.Router();
  app.use('/api', router);

  router.get('/', async (req, res) => {
    const result = await getData();

    try {
      if (
        db
          .get('casesTotal')
          .size()
          .value() > 0
      ) {
        //comparación
        if (db.get('casesTotal[0].count').value() !== result) {
          await db
            .get('casesTotal')
            .remove({ id: 1 })
            .write();
          post = await db
            .get('casesTotal')
            .push({
              id: 1,
              date: Date.now(),
              count: result,
            })
            .write();
        } else {
          post = db.get('casesTotal[0]').value();
        }
      } else {
        post = await db
          .get('casesTotal')
          .push({
            id: 1,
            date: Date.now(),
            count: result,
          })
          .write();
      }
      res.send(post);
    } catch (error) {}
  });

  router.get('/v1', async (req, res) => {
    const post = await db.get('casesTotal');

    try {
      res.send(post);
    } catch (error) {}
  });
};

module.exports = api;
