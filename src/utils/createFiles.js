const fs = require('fs');

const createFile = (dirName, fileName, content) => {
  return new Promise((resolve, reject) => {

    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName, (err) => {
        if (err) reject(err);
      });
    }

    fs.appendFile(`${dirName}/${fileName}`, content, (err) => {
      if (err) {
        reject(err);
      }
      resolve(`Log saved ${content}`);
    });
  });
};

module.exports = {
  createFile,
};
