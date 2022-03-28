import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Adjustment } from "../modules/lost-found/models/adjustment.model";


@Injectable()
export class AdjustmentService
{
    
    constructor(private http: HttpClient)
    {
        
    }
    getAdjustments(LFId: number):Observable<Adjustment[]>
    {
        return this.http.get<Adjustment[]>("api/Adjustment/LF/"+LFId);
    }
    putAdjustment(adjustmentId: number, adjustment: Adjustment)
    {
        this.http.put("api/Adjustment/"+adjustmentId,adjustment);
    }
    deleteAdjustment(adjustmentId: number):Observable<any>
    {
       return this.http.delete("api/Adjustment/"+adjustmentId);
    }
    sendEmail(row:Adjustment):Observable<number>
    {
        return this.http.post<number>("/api/Adjustment/sendEmail",row);
    }
}