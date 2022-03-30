export class Adjustment {
    id?: number;
    lostId?: number;
    foundId?: number;
    adjustmentPercentage?: number;
    statusEmail?: number;
    statusPhone?: number;


     incStatusMail() {
        this.statusEmail! += 1
    }
    public incStatusFhone() {
        this.statusPhone! += 1
    }

}