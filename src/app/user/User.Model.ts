import {Guid} from "guid-typescript";
import {MembershipModel} from "../membership/Membership.Model";

export class UserModel {
  id: string = Guid.create().toString();
  firstname: string = "";
  lastname: string = "";
  email: string = "";
  phone: string = "";
  password: string = "";
  membershipId: string = "4d07ca7e-aa29-456f-8808-27ea0dcfe096"; //Id fra customer
  membership: MembershipModel = new MembershipModel();
}
