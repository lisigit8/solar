import * as moment from "moment";
import {Site} from "./site";

export class WarrentyDetails {
  site: Site;
  vendor_id: string;
  vendor: string;
  device_id: string;
  device_name: string;
  device_ID: string;
  contractor_id: string;
  contractor: string;
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
