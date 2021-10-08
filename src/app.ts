/****************************************************************************/
/* Importing Controllers and Depandency                                     */
/****************************************************************************/
require("dotenv").config();
// import express, { Application, Request, Response } from "express";
const express = require("express");
import { startingServer } from "./services/server_setup";
import { CMiscellaneous } from "./controllers/miscellaneous_controller";

import { routeAppUser } from "./routes/appuser";
import { convertToObject } from "typescript";
import { CTokenManagement } from "./controllers/token_controller";

// import { jwt } from "jsonwebtoken";
/****************************************************************************/
/* Initializing Global Variables    for the server                          */
/****************************************************************************/
// let app = express();
const jwt = require("jsonwebtoken");
const webPort = 5000;
const applicationName = "Server LNT";
const path = require("path");
const cmiscellaneous = new CMiscellaneous();
const cTokenManagement = new CTokenManagement();
// let refreshTokensList = [] as any;

const posts = [
  { username: "bolivar", title: "Titulo 1" },
  { username: "Soriano", title: "Titulo 2" },
];
let responseToFrontEnd: any;
/***************************************************************************
 * Route calling controller                                                 *
 ***************************************************************************/
(function main() {
  let app = new startingServer(webPort).serverStarted();

  app.get("/", (req, res) => {
    const responseToFrontEnd = ` App route its Working ==> ${new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, "")}`;

    cmiscellaneous.serverResponse(responseToFrontEnd, res, "NoLog");
  });

  app.get("/login", (req, res) => {
    const username = req.query.username;
    const user = { name: username };
    // res.send({ accessToken: accessToken });
    const accessToken = cTokenManagement.generateAccessToken(user);
    const refreshToken = cTokenManagement.refreshAccessToken(user);

    cmiscellaneous.serverResponse(
      { accessToken: accessToken, refreshToken: refreshToken },
      res,
      "NoLog"
    );
  });
  app.get("/gettoken", (req, res) => {
    // console.log("my tocken list");
    // console.log(refreshTokensList);
    const refreshToken = req.query.token;

    if (refreshToken == null) {
      responseToFrontEnd = { error: 401, message: "Token is required" };
    }

    if (!cTokenManagement.getRefreshTokenList().includes(refreshToken)) {
      responseToFrontEnd = { error: 403, message: "Invalid Token" };
    } else {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          if (err) {
            responseToFrontEnd = { error: 403, message: "Invalid Token" };
          }
          responseToFrontEnd = cTokenManagement.generateAccessToken({
            name: user.name,
          });
        }
      );
    }
    cmiscellaneous.serverResponse(responseToFrontEnd, res, "NoLog");
  });

  app.post("/posts", cTokenManagement.authenticateToken, (req: any, res) => {
    if (req.error) {
      responseToFrontEnd = req.error;
    } else {
      responseToFrontEnd = posts.filter(
        (posts) => posts.username === req.user.name
      );
    }
    cmiscellaneous.serverResponse(responseToFrontEnd, res, "NoLog");
  });

  app.use("/appuser", routeAppUser);
})();
