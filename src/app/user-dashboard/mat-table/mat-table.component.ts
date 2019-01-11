import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { MatTableDataSource } from './mat-table-datasource';
import { CrudServiceService } from 'src/app/services/crud-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss'],
})
export class MatTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  dataSource: MatTableDataSource;
  displayedColumns = ['id', 'status', 'user', 'date', 'userSystem'];
  
  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.paginator, this.sort, this.crudServiceParam);
    this.refresh();
  }

  constructor(private crudServiceParam : CrudServiceService, private changeDetectorRefs: ChangeDetectorRef, private router: Router){}
  // refresh(){
  //   setInterval(() => {
  //     this.dataSource = new MatTableDataSource(this.paginator, this.sort, this.crudServiceParam);
  //   }, 1000);
  // }

    refresh(){
      setInterval(() => {
       this.paginator._changePageSize(this.paginator.pageSize);
      },1000);
    }

  logout(){
    sessionStorage.setItem("authToken", "");
    this.router.navigate(['/updateStatus'])
  }
}
