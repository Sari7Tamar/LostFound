import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdjustmentService } from 'src/app/services/adjustmentService.service';
import { UserService } from 'src/app/services/userService.service';
import { TypeLF } from '../models/typeLF.enum';
import { Adjustment } from '../models/adjustment.model';
import { LostFoundService } from 'src/app/services/lostFoundService.service';
import { NewLF } from '../models/newLF.model';

@Component({
  selector: 'app-adjustments',
  templateUrl: './adjustments.component.html',
  styleUrls: ['./adjustments.component.css']
})
export class AdjustmentsComponent implements OnInit {


  LFId:number=0 //  של הפריט שאליו מתאימים id
  myLF:NewLF| undefined //הפריט שאליו מתאימים
  ADJUSTMENTS!:Adjustment[]
  lfRow?:NewLF
  ALL_LF_LIST!:NewLF[]
  MY_LF_LIST:Array<NewLF>=[]
  constructor(private _acr: ActivatedRoute,private userService:UserService, private lfService:LostFoundService, private adjustmentService:AdjustmentService, private router:Router) { }

  ngOnInit(): void {
    var s=sessionStorage.getItem("user")
    this.userService.user=JSON.parse(s!)

    this._acr.paramMap.subscribe(params => {
      var idParam = params.get("id");
      if (idParam && idParam != null)
        this.LFId = +idParam;
    })


    this.lfService.getLF(this.LFId).subscribe(data=>{
      this.myLF=data;
      if(this.myLF?.lf?.type==TypeLF.Lost)
      {
        this.lfService.getAllLFByType(TypeLF.Found,0).subscribe(data=>
          {
          this.ALL_LF_LIST=data 
          
          this.adjustmentService.getAdjustments(this.LFId).subscribe(data=>{
            this.ADJUSTMENTS=data;
            this.ADJUSTMENTS.forEach(adj => {
             this.MY_LF_LIST.push(this.ALL_LF_LIST!.filter(f=>f.lf!.id==adj.foundId!)[0])
          });
          
        });
      });
      }
        
      else
      {
        this.lfService.getAllLFByType(TypeLF.Lost,0).subscribe(data=>
          {
          this.ALL_LF_LIST=data
          this.adjustmentService.getAdjustments(this.LFId).subscribe(data=>{
            this.ADJUSTMENTS=data;
            this.ADJUSTMENTS.forEach(adj => {
              this.MY_LF_LIST?.push(this.ALL_LF_LIST!.filter(l=>l.lf!.id==adj.lostId!)[0])
            });
        });
      });
      }
    })
    
  }

  // getLF(row:Adjustment){
  //   if(this.myLF?.lf?.type==TypeLF.Lost)
  //     this.lfRow!=this.ALL_LF_LIST?.find(i=>i.lf!.id==row.foundId!)
  //     //this.lfService.getLF(row.foundId!).subscribe(data=>this.lfRow=data)
  //   else
  //     this.lfRow!=this.LF_LIST?.filter(i=>i.lf!.id==row.lostId!)
  //     //this.lfService.getLF(row.lostId!).subscribe(data=>this.lfRow=data)
  // }

  showDetails(row:Adjustment)
  {
    if(this.myLF?.lf?.type==TypeLF.Lost)
      this.router.navigate(['/lfDetails',{typeLF:TypeLF.Found, id:row.foundId}])
    else
      this.router.navigate(['/lfDetails',{typeLF:TypeLF.Lost, id:row.lostId}])
  }

  sendEmail(row:Adjustment, index:number)
  {
    this.adjustmentService.sendEmail(row).subscribe(succeed=>
      {
        if(succeed==1)
        {
          alert("נשלח  sfasfgadgda!")
          //row.incStatusMail()
          //this.ADJUSTMENTS[index]=row
          this.adjustmentService.getAdjustments(this.LFId)////hgyuhouijkugyjmuhkuf,
          //לעדכן רשימה בסרבר ולהביא לקליינט
        }
        else
          alert("השליחה לא הצליחה")
      })
    
  }

  

  call(row:Adjustment)
  {
    //   //להתקשר
    //   var succeed!:number
    // if(typeLF==TypeLF.Lost)
    // {
    //   //להתקשר למאבד
    //   if(succeed==1)
    //     row.incStatusFhone()
    // }
    // else
    // {
    //   //להתקשר למוצא
    //   if(succeed==1)
    //     row.incStatusFhone()
    // }
  }

  deleteAdjustment(adjustId?:number)
  {
    this.adjustmentService.deleteAdjustment(adjustId!).subscribe(()=>
    {
      this.adjustmentService.getAdjustments(this.LFId).subscribe(data=>
        {
          this.ADJUSTMENTS=data
          if(this.myLF?.lf?.type==TypeLF.Lost)
          {
            this.ADJUSTMENTS.forEach(adj => {
              this.MY_LF_LIST.push(this.ALL_LF_LIST!.filter(f=>f.lf!.id==adj.foundId!)[0])
            })
          }
          else
          {
            this.ADJUSTMENTS.forEach(adj => {
              this.MY_LF_LIST.push(this.ALL_LF_LIST!.filter(l=>l.lf!.id==adj.lostId!)[0])
            })
          }
        
        } )
    }
    

    )
   
  }
}
