export interface IAppUserInfo {
  firstName: string;
  midName?: string;
  lastName: string;
  entityTypeId: number;

  masterId?: number;
  createdUserId?: number;
  createddDate?: Date;
  modifiedUserId?: number;
  modifiedDate?: Date;
  appUserId?: number;
}

export interface ICredential {
  username: string;
  password: string;
  newPassword: string;
}
export interface IPhoneNumber {
  phone: string;
  entityTypeId: number;
  statusID: number;
}
export interface IEmail {
  email: string;
  entityTypeId: number;
  statusID: number;
}
export interface IAddress {
  street: string;
  apartment: string;
  city: string;
  stateId: string;
  countryId: string;
  zipcode: string;
  entityTypeId: number;
  statusID: number;
}
export interface IAppUser {
  personalInfo: IAppUserInfo;
  credential: ICredential;
  phone: IPhoneNumber;
  email: IEmail;
  address: IAddress;
}
