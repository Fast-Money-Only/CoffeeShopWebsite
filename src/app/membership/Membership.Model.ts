import {Guid} from "guid-typescript";

export class MembershipModel {
  id: string = Guid.create().toString();
  title: string = "";
}
