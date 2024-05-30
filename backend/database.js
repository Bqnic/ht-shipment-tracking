const sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "../database/shipmentDB";

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

module.exports = db;
