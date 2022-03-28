import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/userService.service';
import { HomeComponent } from '../../lost-found/home/home.component';
import { User } from '../../lost-found/models/user.model';
import { LoginComponent } from '../login/login.component';


export interface DialogData {
  isManager: boolean;
}

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})

export class NewUserComponent implements OnInit {

  newUserForm!: FormGroup;

  isManager: boolean = false


  constructor(private _acr: ActivatedRoute, private userService: UserService, private router: Router, public dialogRef: MatDialogRef<LoginComponent>, public dialogRefFromHome: MatDialogRef<HomeComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.newUserForm = new FormGroup({
      name: new FormControl("", Validators.required),
      password: new FormControl("", [Validators.required, Validators.minLength(8)]),
      repassword: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      fhone: new FormControl("", [Validators.maxLength(10), Validators.minLength(7)]),
    });

    // this._acr.paramMap.subscribe(params => {
    //   let isManagerParam = params.get("isManager");
    //   if (isManagerParam && isManagerParam != null && isManagerParam=="false")
    //      this.isManager = false;
    //   else if (isManagerParam && isManagerParam != null && isManagerParam=="true")
    //      this.isManager = true;
    // })

    this.isManager = this.data.isManager
  }

  signin() {
    if (this.newUserForm.controls['password'].value != this.newUserForm.controls['repassword'].value) {
      alert("האימות אינו תואם את הסיסמא")
      this.newUserForm.controls['repassword'].setValue("")
    }
    else {
      var user: User = new User(this.newUserForm.controls['name'].value, this.newUserForm.controls['password'].value, this.isManager, this.newUserForm.controls['email'].value, this.newUserForm.controls['fhone'].value)
      this.userService.postUser(user).subscribe(data => {
        user.id = data

        if (user.id == 0) {
          alert("משתמש זה כבר קיים")
          return
        }
        this.userService.getUserById(user.id).subscribe(data => {
          this.userService.setMyUser(data) 

          this.dialogRef.close();
          this.dialogRefFromHome.close();

          // this.router.navigate(['/home'])
        })
      })
    }
  }

  back() {

    //this.router.navigate(['/login'])

    //לשנות, לא תמיד ללוגין
  }
}
