const fs = require('fs');
const prettier = require("prettier");


const saveToJSON = (fileName, data) => {
  fs.writeFile(`./db/${fileName}.json`, prettier.format(JSON.stringify(data), {
    parser: "json",
  }), (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('data scrapped ✅');
  });
};

module.exports = saveToJSON;
