import {Guid} from "guid-typescript";

export class OrderProductDTOModel {
    id: string = Guid.create().toString();
    name: string = "";
    quantity: number = 0;

}
