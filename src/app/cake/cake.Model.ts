import {Guid} from "guid-typescript";
export class CakeModel{
  id: string = Guid.create().toString();
  name: string  = "";
  price: number = 0;
}
