const express = require('express');
const path = require('path');

const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const getData = require('../../lib/index');

let dir_db = 'db',
  path_lists = path.join(dir_db, 'corona.json');

const api = async app => {
  const adapter = new FileAsync(path_lists);
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
