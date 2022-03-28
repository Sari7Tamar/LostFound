export class Adjustment{
id?: number;
lostId?: number;
foundId?: number;
adjustmentPercentage?: number;
statusEmail?: number;
statusPhone?: number;


    incStatusMail()
    {
        this.statusEmail!+=1
    }
    incStatusFhone()
    {
        this.statusPhone!+=1
    }
   
}