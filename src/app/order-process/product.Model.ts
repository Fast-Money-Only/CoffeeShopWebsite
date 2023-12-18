import {Guid} from "guid-typescript";

export class ProductModel {
    ProductId: string = Guid.create().toString();
    ProductName: string = "";
    ProductNumber: string = ""; //Id fra kaffe, kage, costum kaffe etc.
    Price: number = 0;
}
