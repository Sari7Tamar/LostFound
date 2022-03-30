
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Route, RouterModule, Routes } from '@angular/router';
import { LoginModule } from './modules/authentication/login.module';
import { UserService } from './services/userService.service';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { LostFoundModule } from './modules/lost-found/lost-found.module';
import {MatDatepickerModule} from '@angular/material/datepicker';


@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    LostFoundModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoginModule,
    ReactiveFormsModule,
    FormsModule, 
    BrowserAnimationsModule,
    MatSliderModule,
    MatNativeDateModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRippleModule,
    MatTableModule,
    MatDatepickerModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
