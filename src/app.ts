/****************************************************************************/
/* Importing Controllers and Depandency                                     */
/****************************************************************************/
import express, { Application, Request, Response } from "express";
import { startingServer } from "./services/server_setup";
import { CMiscellaneous } from "./controllers/miscellaneous_controller";

/****************************************************************************/
/* Initializing Global Variables    for the server                          */
/****************************************************************************/
let app = express();

const webPort = 5000;
const applicationName = "Server LNT";
const path = require("path");
const cmiscellaneous = new CMiscellaneous();


/***************************************************************************
 * Route calling controller                                                 *
 ***************************************************************************/

(function main () {
  app = new startingServer(webPort).serverStarted();
}());

app.get("/", (req: Request, res: Response) => {
    const responseToFrontEnd =  ` App route its Working ==> ${new Date()
        .toISOString()
        .replace(/T/, " ")
        .replace(/\..+/, "")}`;
    
    cmiscellaneous.serverResponse(responseToFrontEnd, res, "NoLog");
});




