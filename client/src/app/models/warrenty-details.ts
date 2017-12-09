import * as moment from "moment";
import {Site} from "./site";
import {Device} from "./device";
import {Vendor} from "./vendor";
import {Contractor} from "./contractor";
import {Customer} from "./customer";
import {Documents} from "./documents";
import {Warranty_SendVia} from "./warranty-sendvia";

export class WarrentyDetails {
  site: Site;
  device: Device;
  vendor: Vendor;
  contractor: Contractor;
  customer: Customer;

  documents: Documents[];
  warrantyInfo_sendVia: Warranty_SendVia[];

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
