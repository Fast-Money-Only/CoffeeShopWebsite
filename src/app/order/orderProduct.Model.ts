import {Guid} from "guid-typescript";

export class OrderProductModel {
    id: string = Guid.create().toString();
    name: string = "";
    quantity: number = 0;

}
