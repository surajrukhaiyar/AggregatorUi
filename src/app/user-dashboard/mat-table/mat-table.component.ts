import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
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
  dataSource: MatTableDataSource;
  displayedColumns = ['id', 'status', 'user', 'date', 'userSystem'];
  
  ngOnInit() {
    this.refresh();
  }

  constructor(private crudServiceParam : CrudServiceService, private changeDetectorRefs: ChangeDetectorRef, private router: Router){
  }

  refresh(){
    this.crudServiceParam.getLogRecord()
    .subscribe((res) => {
      this.dataSource = new MatTableDataSource(this.paginator, this.sort, this.crudServiceParam);
      this.changeDetectorRefs.detectChanges();
    });
    // setInterval(() => {
    //   this.dataSource = new MatTableDataSource(this.paginator, this.sort, this.crudServiceParam);
    //   console.log("refreshed");
    // }, 1000);
  }

  logout(){
    sessionStorage.setItem("authToken", "");
    this.router.navigate(['/updateStatus'])
  }
}
