import { IAppUser } from "./interfaces";

// App User Class
export class CAppuser {
  iAppUser: IAppUser;
  private isValidUser: string;

  constructor(iAppUser: IAppUser, action: string) {
    this.iAppUser = iAppUser;
    if (action != "validate") {
      this.isValidUser = "valid";
      if (
        this.iAppUser.lastName.length < 2 ||
        this.iAppUser.firstName.length < 2 ||
        this.iAppUser.username.length < 5 ||
        this.iAppUser.username.length > 15 ||
        this.iAppUser.passcode.length < 5 ||
        this.iAppUser.passcode.length > 20
      ) {
        this.isValidUser = "EV0001";
      }

      if (isNaN(this.iAppUser.masterId) || isNaN(this.iAppUser.createdUserId)) {
        this.isValidUser = "EV0002";
      }
    }
  }

  getIsValidAppUser() {
    return this.isValidUser;
  }

  getAppUserFullName(type) {
    var returnValue = "";
    if (type == "F") {
      returnValue = this.iAppUser.lastName + ", " + this.iAppUser.firstName;
    } else {
      returnValue = this.iAppUser.firstName + " " + this.iAppUser.lastName;
    }
    return returnValue;
  }

  makeComment({ firstName = this.iAppUser.firstName } = {}) {
    if (firstName == "Bolivar") {
      throw new Error("Comment must have a valid id.");
    }
  }
}
