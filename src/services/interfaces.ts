export interface IAppUser {
  firstName: string;
  lastName: string;
  entityTypeId: number;
  phone: string;
  email: string;
  username: string;
  passcode: string;

  street: string;
  city: string;
  stateId: string;
  countryId: string;
  zipcode: string;

  masterId: number;
  createdUserId: number;
  modifiedUserId: number;
  modifiedDate: Date;
  appUserId: number;
}

export interface IAppUserCredential {
  username: string;
  password: string;
}
