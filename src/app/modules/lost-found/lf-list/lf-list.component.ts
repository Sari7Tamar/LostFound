import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { LostFoundService } from 'src/app/services/lostFoundService.service';
import { UserService } from 'src/app/services/userService.service';
import { Address } from '../models/address.model';
import { LostFound } from '../models/lostFound.model';
import { NewLF } from '../models/newLF.model';
import { PublicTransport } from '../models/publicTransport.model';
import { TypeLF } from '../models/typeLF.enum';


@Component({
  selector: 'app-lf-list',
  templateUrl: './lf-list.component.html',
  styleUrls: ['./lf-list.component.css']
})
export class LfListComponent implements OnInit, AfterViewInit {
  LOST_FOUNDS!: NewLF[]
  typeLF: TypeLF = TypeLF.Lost
  userId: number = 0
  displayedColumns: string[] = ['id', 'description', 'addedDate', 'showDetails', 'deleteLF', 'showAdjustment'];
  dataSource: MatTableDataSource<NewLF>= new MatTableDataSource<NewLF>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _acr: ActivatedRoute, private LFService: LostFoundService, public userService: UserService, private router: Router) {

    // Create data

    // Assign the data to the data source for the table to render

  }
  ngAfterViewInit(): void {
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  ngOnInit(): void {
    var s = sessionStorage.getItem("user")
    this.userService.user = JSON.parse(s!)
    this._acr.paramMap.subscribe(params => {
      var typeLFParam = params.get("typeLF");
      if (typeLFParam && typeLFParam != null)
        this.typeLF = +typeLFParam;
      var userIdParam = params.get("userId");
      if (userIdParam && userIdParam != null)
        this.userId = +userIdParam;
    })
    this.LFService.getAllLFByType(this.typeLF, this.userId).subscribe(data => {
      this.LOST_FOUNDS = data;
      this.dataSource.data=this.LOST_FOUNDS
      
     
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource!.filter = filterValue.trim().toLowerCase();

    if (this.dataSource!.paginator) {
      this.dataSource!.paginator.firstPage();
    }


  }
  deleteLF(id: number) {
    this.LFService.deleteLF(id).subscribe(()=>{
      console.log("success")});
  }

  showDetails(typeLF: TypeLF, id: number) {
    this.router.navigate(['/lfDetails', { typeLF: typeLF, id: id }])
  }

  showAjustments(id: number) {
    debugger;
    this.router.navigate(['/adjustments', { id: id }])
  }
}













