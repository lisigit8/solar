import {Role} from "./role";

export class Users {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  address: string;
  userId: string;
  password: string;

  roles: Role[]
}
