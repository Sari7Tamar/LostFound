import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LfListComponent } from './lf-list/lf-list.component';
import { LfDetailsComponent } from './lf-details/lf-details.component';
import { AdjustmentsComponent } from './adjustments/adjustments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LostFoundService } from 'src/app/services/lostFoundService.service';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatRadioModule} from '@angular/material/radio';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { AdjustmentService } from 'src/app/services/adjustmentService.service';



@NgModule({
  declarations: [
    HomeComponent,
    LfListComponent,
    LfDetailsComponent,
    AdjustmentsComponent,
  ],
  imports: [
    MatInputModule,
    MatPaginatorModule ,
    CommonModule,
    BrowserModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRippleModule,
    MatTableModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule, 
    BrowserAnimationsModule,
    MatSliderModule,
    MatNativeDateModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRippleModule,
    MatTableModule,
    MatRadioModule,
    MatDialogModule,
    MatDatepickerModule,    

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers:[
    {
      provide: MatDialogRef,
      useValue: {}
    },
    LostFoundService,
    AdjustmentService
  ],
  exports:[
    LfDetailsComponent
  ]
})
export class LostFoundModule { }
