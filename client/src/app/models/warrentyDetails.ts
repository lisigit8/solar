import * as moment from "moment";
import {Site} from "./site";
import {Device} from "./device";
import {Vendor} from "./vendor";
import {Contractor} from "./contractor";
import {Customer} from "./customer";
import {Documents} from "./documents";
import {Warranty_SendVia} from "./warranty-sendvia";
import {DeviceName} from "./deviceName";

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
  auto_renewal: boolean;
  reminder_date: Date;

  device_name: string;
  device_ID: string;
  vendor_name: string;
  contractor_name: string;
  deviceName: DeviceName;
}
