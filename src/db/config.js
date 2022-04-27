const sqlite3 = require('sqlite3')
//const sqlite = require('sqlite')
//importing only the function/property "open"
const { open } = require('sqlite')

//Opening the conection to the db
module.exports = () => {
    open({
        filename: './database.sqlite',
        driver: sqlite3.Database,
    });
};
