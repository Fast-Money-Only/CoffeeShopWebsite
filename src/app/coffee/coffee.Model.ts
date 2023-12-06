import {Guid} from "guid-typescript";
export class CoffeeModel{
  id: string = Guid.create().toString();
  name: string  = "";
}
