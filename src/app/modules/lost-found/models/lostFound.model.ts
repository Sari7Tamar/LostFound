import { TypeLF } from "./typeLF.enum";

export class LostFound {
    id?: number;
    description?: string;
    date?: Date;
    image? :MediaImage
    type?: TypeLF;
    locationType?: string;
    userId?: number
    addedDate?: Date;

    constructor(d: string, date: Date, t: TypeLF, l: string | undefined, userId: number | undefined) {
        this.description = d
        this.date = date
        //image? :
        this.type = t
        this.locationType = l
        this.userId = userId
        this.addedDate =new Date()
    }
}

