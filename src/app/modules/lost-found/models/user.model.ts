export class User{
id: number=0;
name?: string;
password?: string; 
isManager: boolean=false;
email?: string;
fhone?: string;
token?: string;

constructor(n:string, p:string, m:boolean ,e:string, f:string) {
    this.name=n;
    this.password=p;
    this.isManager=m
    this.fhone=f
    this.email=e
}
}
 