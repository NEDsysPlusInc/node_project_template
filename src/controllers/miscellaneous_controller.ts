import express, { Response } from "express";

export class CMiscellaneous {
  constructor() {} // end of constructor

  serverResponse(response: any, res: Response, sender: any) {
    if (sender != "NoLog") {
      console.log("this is to response:" + sender);
      console.log(response);
    } else {
      console.log("No Log show");
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(response));
    res.end();
  }
}
