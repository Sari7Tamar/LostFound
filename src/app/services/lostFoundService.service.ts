
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Adjustment } from "../modules/lost-found/models/adjustment.model";
import { LostFound } from "../modules/lost-found/models/lostFound.model";
import { NewLF } from "../modules/lost-found/models/newLF.model";

@Injectable()
export class LostFoundService
{
    constructor(private http: HttpClient)
    {
        
    }
    getLF( LFid: number):Observable<NewLF>
    {
        return this.http.get<NewLF>("/api/NewLF/"+LFid);
    }
    getAllLFByType( type: number,userId:number):Observable<NewLF[]>
    {
        return this.http.get<NewLF[]>("/api/NewLF/"+type+"/"+userId);
    }
    postLF( lf: NewLF):Observable<number>
    {
        return this.http.post<number>("/api/NewLF",lf);
    }
    deleteLF(LFId:number):Observable<any>
    {
        return this.http.delete<any>("/api/NewLF/"+LFId);
    }
   
}