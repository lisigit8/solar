import * as moment from "moment";
import {Site} from "./site";
import {Device} from "./device";
import {Vendor} from "./vendor";
import {Contractor} from "./contractor";
import {Users} from "./users";
import {Documents} from "./documents";

export class WarrentyDetails {
  site: Site;
  device: Device;
  vendor: Vendor;
  contractor: Contractor;
  user: Users;

  documents: Documents[];

  _id: string;
  start_date: Date;
  end_date: Date;
  cost: number;
  file_path: string;
  auto_renewal: boolean;
  reminder_date: Date;
  send_to: string;
  send_via: string;
}
