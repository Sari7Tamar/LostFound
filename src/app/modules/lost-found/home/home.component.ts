import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userService.service';
import { TypeLF } from '../models/typeLF.enum';
import { User } from '../models/user.model';
import {Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoginComponent } from '../../authentication/login/login.component';
import {MatDialogModule} from '@angular/material/dialog';
import { NewUserComponent } from '../../authentication/new-user/new-user.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public userService:UserService , private router:Router ,public dialog: MatDialog) {
   
   }
  ngOnInit(): void {
    // var s=sessionStorage.getItem("user")
    // this.userService.user=JSON.parse(s!)

  }

  lfDetails(typeLF1:TypeLF)
  {
    if(this.userService.getMyUser()==null)
    {
      let dialogRef = this.dialog.open(LoginComponent, {
        height: '40vh',
        width: '40vw',
      });
    }
    else
    {
      this.router.navigate(['/lfDetails',{typeLF:typeLF1, id:0}])
    }
  }
  myLF(typeLF1:TypeLF)
  {
    if(this.userService.getMyUser()==null)
    {
      let dialogRef = this.dialog.open(LoginComponent, {
        height: '40vh',
        width: '40vw',
      });
    }
    else
    {
      this.router.navigate(['/lfList',{typeLF:typeLF1, userId:this.userService.getMyUser().id}])
    }
  }
  allLF(typeLF1:TypeLF)
  {
    this.router.navigate(['/lfList',{typeLF:typeLF1,userId:0}])
  }
  newManager()
  {
    let dialogRef = this.dialog.open(NewUserComponent, {
      height: '60vh',
        width: '40vw',
        data:{isManager:true}
    });
  }
  login()
  {
    let dialogRef = this.dialog.open(LoginComponent, {
      height: '40vh',
        width: '40vw',
    });
  }
}
