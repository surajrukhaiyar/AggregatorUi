import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { CrudServiceService } from '../services/crud-service.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '../mat-table/mat-table-datasource';
import { MatPaginator, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Observable, of } from 'rxjs';
import { Transaction } from '../model/Transaction';
import { MatTableItem } from '../model/MatTableItem';

var transactionData : Transaction[];

@Component({
  selector: 'app-wf-detail-dialog',
  templateUrl: './wf-detail-dialog.component.html',
  styleUrls: ['./wf-detail-dialog.component.scss']
})
export class WfDetailDialogComponent implements OnInit{
    percent:string;
    displayedColumns = ['name', 'status', 'dateTime','varData']

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSource: MatTableDataSource;
    transactionDS: TransactionDataSource;
    
    constructor(private crudService : CrudServiceService, private route: ActivatedRoute){}

    ngOnInit() {
      this.dataSource = new MatTableDataSource(this.paginator, this.sort, this.crudService);
      this.refresh(this.route.snapshot.queryParamMap.get("rowId"));
      
    }

    refresh(rowId){
      setInterval(() => {
        this.updataData();
        this.dataSource._filterChange.next("");
        if(this.dataSource.data != undefined){
        for(let i=0; i<this.dataSource.data.length; i++){
          if(this.dataSource.data[i]["processId"] == rowId){
            transactionData = this.dataSource.data[i].transactions;
          }
        }
      }
        this.transactionDS = new TransactionDataSource();
        this.getData();
      },1000);
    }


    getData(){
      let wfCount = transactionData == undefined? 0:transactionData.length ;
      let wfCompletedCount = 0;
      for(let i=0; i<wfCount; i++){
          if(transactionData[i].tStatus!= null && transactionData[i].tStatus.indexOf("Completed")!= -1){
            wfCompletedCount += 1;
          }
      }
      this.percent = String((wfCompletedCount/wfCount)*100)
    }

    updataData(){
      this.crudService.getLogRecord()
      .subscribe(logData=>{
            this.dataSource.data = <MatTableItem[]>logData;
      });
    }
}

export class TransactionDataSource extends DataSource<any> {
  connect(): Observable<Transaction[]> {
    return of(transactionData);
  }
  disconnect() {}
}