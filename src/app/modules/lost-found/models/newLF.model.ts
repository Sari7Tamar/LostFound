import { Address } from "./address.model";
import { LostFound } from "./lostFound.model";
import { PublicTransport } from "./publicTransport.model";


export class NewLF{
    lf?:LostFound;
    address? :Address;
    publicTransport?: PublicTransport;

    constructor(lf:LostFound, a:Address|undefined, p:PublicTransport|undefined)
    {
        this.lf=lf
        this.address=a
        this.publicTransport=p
    }
}