const values = {
  previous: {
    intensity: null,
    date: null,
    location: null,
    depth: null,
  },
  last: {
    intensity: null,
    date: null,
    location: null,
    depth: null,
  },
};

const changeValue = (newValue) => {
  values.previous = values.last;
  values.last = newValue;
};

module.exports = {
  values,
  changeValue,
};
