const sqlDb = require('mssql');
var databaseVariable = require('../config/global_variables');

var conn = new sqlDb.ConnectionPool(databaseVariable.MSDDatabase);

export class DBServerConnect {
    constructor(spLicense: any) {
    conn.connect()
        .then(function () {
            var req = new sqlDb.Request(conn);
            req.query(spLicense)
                .then(function (recordset) {
                    // callback(recordset);
                })
                .catch(function (err) {
                    console.log(err);
                    // callback(null, err);
                });
        })
        .catch(function (err) {
            console.log(err);
            // callback(null, err);
        });
    }

    DBServerConnection() {
        return conn;
    }
}



  