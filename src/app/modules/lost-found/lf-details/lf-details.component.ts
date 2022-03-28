import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LostFoundService } from 'src/app/services/lostFoundService.service';
import { UserService } from 'src/app/services/userService.service';
import { Address } from '../models/address.model';
import { LostFound } from '../models/lostFound.model';
import { NewLF } from '../models/newLF.model';
import { PublicTransport } from '../models/publicTransport.model';
import { TypeLF } from '../models/typeLF.enum';


@Component({
  selector: 'app-lf-details',
  templateUrl: './lf-details.component.html',
  styleUrls: ['./lf-details.component.css']
})
export class LfDetailsComponent implements OnInit {
  lfDetailsForm!: FormGroup
  constructor(private _acr: ActivatedRoute, private LFService: LostFoundService, private router: Router, private userService: UserService) {


    this.lfDetailsForm = new FormGroup({
      description: new FormControl("", Validators.required),
      date: new FormControl(),
      place: new FormControl(),
      street: new FormControl(),
      city: new FormControl(),
      busNumber: new FormControl(),
      company: new FormControl(),
      boardingStation: new FormControl(),
      dropStation: new FormControl(),
      image: new FormControl(),
    });
  }
  id: number = 0
  typeLF: TypeLF = TypeLF.Lost
  myLF?: NewLF
  isDisable:boolean =false

  ngOnInit(): void {
    this._acr.paramMap.subscribe(params => {
      var typeLFParam = params.get("typeLF");
      if (typeLFParam && typeLFParam != null)
        this.typeLF = +typeLFParam;
      var idParam = params.get("id");
      if (idParam && idParam != null)
        this.id = +idParam;
    })
    let datePipe = new DatePipe("en-US");
    if (this.id != 0) {
      this.LFService.getLF(this.id).subscribe(data => {
        this.myLF = data
        this.lfDetailsForm.disable();
        this.lfDetailsForm.controls["description"].setValue(this.myLF.lf?.description)
        this.lfDetailsForm.controls["date"].setValue( datePipe.transform(this.myLF.lf?.date, 'dd/MM/yyyy'))
        if (this.myLF.address != null) {
          this.lfDetailsForm.controls["place"].setValue(1)
          this.lfDetailsForm.controls["street"].setValue(this.myLF.address?.streetName)
          this.lfDetailsForm.controls["city"].setValue(this.myLF.address?.cityName)
        }
        else if (this.myLF.publicTransport != null) {
          this.lfDetailsForm.controls["place"].setValue(2)
          this.lfDetailsForm.controls["busNumber"].setValue(this.myLF.publicTransport.busNumber)
          this.lfDetailsForm.controls["company"].setValue(this.myLF.publicTransport.company)
          this.lfDetailsForm.controls["boardingStation"].setValue(this.myLF.publicTransport.boardingStation)
          this.lfDetailsForm.controls["dropStation"].setValue(this.myLF.publicTransport.dropStation)
        }
        else {
          this.lfDetailsForm.controls["place"].setValue(3)
        }

      })
    }
  }
 
  saveLF() {
    this.isDisable=true
    var locationType: string | undefined
    var a: Address | undefined
    var p: PublicTransport | undefined
    if (this.lfDetailsForm.controls["place"].value == 1) {
      locationType = "address"
      a = new Address(this.lfDetailsForm.controls["street"].value, this.lfDetailsForm.controls["city"].value)
    }
    else if (this.lfDetailsForm.controls["place"].value == 2) {
      locationType = "publicTransport"
      p = new PublicTransport(this.lfDetailsForm.controls["busNumber"].value, this.lfDetailsForm.controls["company"].value, this.lfDetailsForm.controls["boardingStation"].value, this.lfDetailsForm.controls["dropStation"].value)
    }

    var lf: LostFound = new LostFound(this.lfDetailsForm.controls["description"].value, this.lfDetailsForm.controls["date"].value, this.typeLF, locationType, this.userService.getMyUser().id)
    this.myLF = new NewLF(lf, a, p)

    this.LFService.postLF(this.myLF).subscribe(data => {
      this.id = data
      if (this.id != 0) {
        if (this.typeLF == TypeLF.Lost)
          alert("האבידה נשמרה במערכת")
        else
          alert("המציאה נשמרה במערכת")
        this.router.navigate(['/home'])
      }
      else {
        alert("השמירה לא הצליחה, נסה שוב")
      }
    })
  }

  back() {
    // if(this.id==0)
    // {
    //   this.router.navigate(['/home'])
    // }
    // else
    // {
    //   this.router.navigate(['/lfList',this.typeLF])
    // }//להוסיף חזרה להתאמות
  }

  deleteLF() {
    this.isDisable=true
    alert("לא יודע לאיפה לחזור")
    this.LFService.deleteLF(this.id).subscribe(() => this.router.navigate(['/lfList', this.typeLF]))

  }

}
