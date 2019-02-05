import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatPaginatorIntl } from '@angular/material';
import { MatTableDataSource } from './mat-table-datasource';
import { CrudServiceService } from 'src/app/services/crud-service.service';
import { Router } from '@angular/router';
import { MatTableItem } from '../model/MatTableItem';

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss'],
})
export class MatTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource;
  displayedColumns = ['name', 'userSystem', 'user', 'date', 'status','wfDetails'];

  interval: any;
  
  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.paginator, this.sort, this.crudServiceParam);
    this.refresh();
  }

  ngOnDestroy(){
    this.stopRefreshing();
  }

  constructor(private crudServiceParam : CrudServiceService,
                   private router: Router){}
 
  refresh(){
    this.interval = setInterval(() => {
      this.updataData();
      this.dataSource._filterChange.next("");
    },1000);
  }

  viewApplicationDetails(row){
    this.crudServiceParam.rowData = row;
    this.router.navigate(['/wfDetail'],{ queryParams: { rowId: row.processId }});
  }

  logout(){
    sessionStorage.setItem("authToken", "");
    this.router.navigate(['/updateStatus'])
  }

  updataData(){
    this.crudServiceParam.getLogRecord()
    .subscribe(logData=>{
          this.dataSource.data = <MatTableItem[]>logData;
    });
  }

  stopRefreshing() {
    clearInterval(this.interval);
   }
}
