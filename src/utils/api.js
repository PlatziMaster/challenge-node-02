const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

// Initialize adapter a lowdb instance
const adapter = new FileSync('db.json');
const db = low(adapter);

// Save default values into empty db.json file
db.defaults({ course: {} });

// Expose methods to get and update stored course
const api = {
  getCourse: () => {
    return db.get('course.title').value();
  },

  updateCourse: (course) => {
    return db.set('course.title', course).write();
  },
};

module.exports = api;
