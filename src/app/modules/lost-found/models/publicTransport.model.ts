export class PublicTransport{
id? :number;
company?:string ;
busNumber?: number;
boardingStation?: string;
dropStation?: string;
LFId ?: number;

constructor(b:number,c:string,bs:string,ds:string)
{
    this.company=c
    this.busNumber=b
    this.boardingStation=bs
    this.dropStation=ds
}
}