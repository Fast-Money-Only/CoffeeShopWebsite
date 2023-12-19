import {Guid} from "guid-typescript";

export class OrderProductModel {
    id: string = Guid.create().toString();
    orderId: string = '';
    productId: string = '';
    quantity: number = 0;

}
