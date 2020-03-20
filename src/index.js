//Instancia LowDB
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const path = require('path');
const dir = 'db';
const fullPath = path.join(dir, 'bitcoin.json');
//Llamar al scrapper
const getData = require('../scrapper/index');

const showBitcoin = async () => {
  const adapter = new FileAsync(fullPath);
  const db = await low(adapter);
  const result = await getData();
  try {
    if (
      db
        .get('bitcoinTotal')
        .size()
        .value() > 0
    ) {
      if (db.get('bitcoinTotal[0].total').value() !== result) {
        console.log('Es diferente');
        await db
          .get('bitcoinTotal')
          .remove({ id: 1 })
          .write();
        post = await db
          .get('bitcoinTotal')
          .push({
            id: 1,
            date: Date.now(),
            total: result,
          })
          .write();
      } else {
        console.log('Es el mismo');
        post = await db.get('bitcoinTotal[0]').value();
        showBitcoin();
      }
    } else {
      console.log('Es el ');
      post = await db
        .get('bitcoinTotal')
        .push({
          id: 1,
          date: Date.now(),
          total: result,
        })
        .write();
    }
  } catch (error) {}
};

showBitcoin();
