import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userService.service';
import { HomeComponent } from '../../lost-found/home/home.component';
import { NewUserComponent } from '../new-user/new-user.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss','./login.component.css']
})

export class LoginComponent implements OnInit {

loginForm!:FormGroup
  constructor(private userService: UserService, private router: Router, public dialogRef: MatDialogRef<HomeComponent>,public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.loginForm=new FormGroup({
      email:new FormControl(),
      password:new FormControl(),
    });
  }

  login() {
    console.log("gggggggggggg")
    this.userService.getUser(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value).subscribe(data => {
      this.userService.setMyUser(data) 
      if (this.userService.getMyUser() == null) {
        alert("שם המשתמש או הסיסמא אינם תקינים, נסה שנית")
          return;
      }
      // this.router.navigate(['/home'])
      this.dialogRef.close();
    });
  }

  newUser() {
    this.dialogRef.close();
    let dialogRef = this.dialog.open(NewUserComponent, {
      height: '60vh',
      width: '40vw',
    });
    // this.router.navigate(['/newUser',{isManager:false}])
  }

}
