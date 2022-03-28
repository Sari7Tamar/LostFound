export class Address{
    id?:number;
    lfId?:number
    streetName?:string;
    cityName?:string

    constructor(s:string, c:string)
    {
       this.streetName=s
       this.cityName=c
    }
}