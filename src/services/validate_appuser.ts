import { IAppUser } from "./interfaces";

// App User Class
export class CValidateAppUser {
  iAppUser: IAppUser;
  private isValidUser: string;

  constructor(iAppUserRequest: any) {
    this.iAppUser = iAppUserRequest;

    console.log(this.iAppUser);

    this.isValidUser = "valid";
    try {
      if (
        this.iAppUser.personalInfo.lastName.length < 2 ||
        this.iAppUser.personalInfo.firstName.length < 2 ||
        this.iAppUser.credential.username.length < 5 ||
        this.iAppUser.credential.username.length > 15 ||
        this.iAppUser.credential.password.length < 5 ||
        this.iAppUser.credential.password.length > 20
      ) {
        this.isValidUser = "EV0001";
      }
    } catch (err: any) {
      this.isValidUser = "EV10001";
    } finally {
      console.log("entering and leaving the finally block");
    }
  }

  getIsValidAppUser() {
    return this.isValidUser;
  }

  getAppUserFullName(type) {
    var returnValue = "";
    if (type == "F") {
      returnValue =
        this.iAppUser.personalInfo.lastName +
        ", " +
        this.iAppUser.personalInfo.firstName;
    } else {
      returnValue =
        this.iAppUser.personalInfo.firstName +
        " " +
        this.iAppUser.personalInfo.lastName;
    }
    return returnValue;
  }

  makeComment({ firstName = this.iAppUser.personalInfo.firstName } = {}) {
    if (firstName == "Bolivar") {
      throw new Error("Comment must have a valid id.");
    }
  }
}
