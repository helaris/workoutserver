const saveToJSON = require('./scraperToJSON');
const data = require('../db/exercises.json');

const removeDuplicates = Array.from(new Set(data.map(e => e.title)))
  .map(title => {
    return data.find(e => e.title === title)
  })

saveToJSON('new', removeDuplicates);


// module.exports = removeDuplicates;