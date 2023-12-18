import {Guid} from "guid-typescript";
export class CoffeePlaceModel{
    coffeePlaceId: string = Guid.create().toString();
    coffeePlaceName: string  = "";
    addressId : string = "";
}
