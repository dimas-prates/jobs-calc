const sqlite3 = require('sqlite3')
//importing only the function/property "open"
//const sqlite = require('sqlite')
const { open } = require('sqlite')

//Opening the conection to the db
module.exports = () => {
    open({
        filename: './database.sqlite',
        driver: sqlite3.Database,
    });
};
