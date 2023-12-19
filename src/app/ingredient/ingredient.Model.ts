import {Guid} from "guid-typescript";
export class IngredientModel {
  id: string = Guid.create().toString();
  name: string = "";
}
