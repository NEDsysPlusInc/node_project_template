const sqlDb = require("mssql");

import { DBServerConnect } from "../services/dbconnection";
import { IAppUser, IAppUserCredential } from "../services/interfaces";
import { CEncrypt } from "../services/miscellaneous";

const conn = new DBServerConnect("spCheckAppLicense").DBServerConnection();
export class CPostAppUser {
  constructor() {} // end of constructor

  postAppUser(appUser: IAppUser) {
    return new Promise(function (resolve, rejects) {
      // console.log('Data to be send to DB');
      // console.log(appUser);
      const m = new CEncrypt();
      m.encription(appUser.passcode)
        .then(function (result) {
          conn.connect().then(async (conn) => {
            var request = new sqlDb.Request(conn)
              .input("firstName", sqlDb.VarChar(25), appUser.firstName)
              .input("lastName", sqlDb.VarChar(25), appUser.lastName)
              .input("entityTypeId", sqlDb.Int, appUser.entityTypeId)
              .input("phone", sqlDb.VarChar(20), appUser.phone)
              .input("email", sqlDb.VarChar(30), appUser.email)
              .input("username", sqlDb.VarChar(20), appUser.username)
              .input("passcode", sqlDb.VarChar(100), result)
              .input("street", sqlDb.VarChar(100), appUser.street)
              .input("city", sqlDb.VarChar(50), appUser.city)
              .input("stateId", sqlDb.Int, appUser.stateId)
              .input("countryId", sqlDb.Int, appUser.countryId)
              .input("zipcode", sqlDb.VarChar(20), appUser.zipcode)
              .input("masterId", sqlDb.Int, appUser.masterId)
              .input("createdUserId", sqlDb.Int, appUser.createdUserId)
              .input("DMLFlag", sqlDb.VarChar(1), "I")
              .execute("usp_CRUDAppUser")
              .then((result) => {
                // console.log("result mio");
                // console.log(result);
                resolve(result.recordset[0].Result);
              })
              .catch((err) => {
                console.log(err);
              });
          }); // end of connection
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
}

export class CGetsAppUser {
  constructor() {} // end of constructor

  getAppUser(appUser: any) {
    console.log("get for login");
    console.log(appUser);
    return new Promise(function (resolve, rejects) {
      conn
        .connect()
        .then(async (conn) => {
          var request = new sqlDb.Request(conn)
            .input("username", sqlDb.VarChar(20), appUser.username)
            .input("DMLFlag", sqlDb.VarChar(1), "V")
            .execute("spAppUserGets")
            .then((result) => {
              if (result.recordset[0] == undefined) {
                resolve("Not Record Found");
              } else {
                // console.log("here mi estoy");
                // console.log(result.recordset[0]);
                resolve(result.recordset[0]);
              }
              // console.log(result.recordset[0]);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .then(function (result) {
          // console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
}
export class CBrowseAppUser {
  constructor() {} // end of constructor

  getAppUser(rD) {
    var requestData = rD;
    // console.log("from browseUser");
    // console.log(requestData);
    return new Promise(function (resolve, rejects) {
      conn
        .connect()
        .then(async (conn) => {
          if (requestData.action == "B") {
            var request = new sqlDb.Request(conn)
              .input("masterId", sqlDb.Int, requestData.masterId)
              .input("DMLFlag", sqlDb.VarChar(1), requestData.action)
              .execute("spAppUserGets")
              .then((result) => {
                if (result.recordset[0] == undefined) {
                  resolve("Not Record Found");
                } else {
                  // console.log(result.recordset);
                  delete result.recordset[0].Passcode;
                  resolve(result.recordset);
                }
                // console.log(result.recordset[0]);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .then(function (result) {
          // console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
}
