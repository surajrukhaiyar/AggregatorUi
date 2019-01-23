import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { CrudServiceService } from '../services/crud-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '../mat-table/mat-table-datasource';
import { MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-wf-detail-dialog',
  templateUrl: './wf-detail-dialog.component.html',
  styleUrls: ['./wf-detail-dialog.component.scss']
})

export class WfDetailDialogComponent implements OnInit{
    data: any;
    percent:string;
    rowId: string;
    matDataSource: MatTableDataSource;
    filteredData: any;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private crudService : CrudServiceService, private route: ActivatedRoute, private crudServiceParam: CrudServiceService){}

    ngOnInit() {
      this.matDataSource = new MatTableDataSource(this.paginator, this.sort, this.crudServiceParam);
      // this.refresh();
      this.rowId = this.route.snapshot.queryParamMap.get("rowId");
      this.percent = "0";
      this.getData();
      this.matDataSource._filterChange.subscribe();
      this.filteredData = this.applyFilter(this.rowId);
      
      console.log(this.rowId);
    }

    // refresh(){
    //   setInterval(() => {
    //     this.paginator._changePageSize(this.paginator.pageSize);
    //   },1000);
    // }


    getData(){
      this.data = this.crudService.rowData;
      let wfCount = this.data.transactions.length ;
      let wfCompletedCount = 0;
      for(let i=0; i<this.data.transactions.length; i++){
          if(this.data.transactions[i].tStatus == "Completed"){
            wfCompletedCount += 1;
          }
      }
      this.percent = String((wfCompletedCount/wfCount)*100)
    }

    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.matDataSource.filter = filterValue;
    }
}