
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../modules/lost-found/models/user.model";
import { Observable } from 'rxjs';
import { UserDTO } from "../modules/lost-found/models/UserDTO";
import { Adjustment } from "../modules/lost-found/models/adjustment.model";

@Injectable()
export class UserService {
    public user?: User;
    
    constructor(private http: HttpClient) {
    }
    
    postUser(user: User): Observable<number> {
        return this.http.post<number>("/api/User", user);
    }

    // putUser(userId: number, user: User): void {
    //     this.http.put("/api/User" + userId, user);
    // }    עקרונית לא צריך

    getUser(name: string, password: string): Observable<User> {
        var user: UserDTO = new UserDTO(name, password);
        return this.http.post<User>("/api/User/login", user);
    }

    getUserById(id: number): Observable<User> {
        return this.http.get<User>("/api/User/" + id);
    }

    
}
