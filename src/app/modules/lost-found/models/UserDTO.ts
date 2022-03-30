export class UserDTO{
    email?: string;
    password?:string;

    constructor(n:string,p:string) {
       this.email=n;
       this.password=p;

    }
}
