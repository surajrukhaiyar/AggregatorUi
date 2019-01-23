import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
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
  displayedColumns = ['name', 'userSystem', 'user', 'status', 'date', 'wfDetails'];
  
  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.paginator, this.sort, this.crudServiceParam);
    this.refresh();
  }

  constructor(private crudServiceParam : CrudServiceService,
                   private router: Router, private dialog: MatDialog){}
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

  viewApplicationDetails(row){
    this.crudServiceParam.rowData = row;
    this.router.navigate(['/wfDetail'],{ queryParams: { rowId: row.id }});
  }


  logout(){
    sessionStorage.setItem("authToken", "");
    this.router.navigate(['/updateStatus'])
  }
}
