import {Guid} from "guid-typescript";
export class PostModel {
  id: string = Guid.create().toString();
  title: string = "";
  img: string = "";
  userID: string = "";
}
