
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from '../http-error-handler.service';
import { MatTableItem } from '../model/MatTableItem';
import { BehaviorSubject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'authToken'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CrudServiceService {
  rowData : any;
  dataChange: BehaviorSubject<MatTableItem[]> = new BehaviorSubject<MatTableItem[]>([]);

  private handleError: HandleError;
  allStatusUrl = 'http://aggregator:9093/demo/all';
 
  constructor(private http : HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('LoginService')
  }

  getLogRecord(){
    httpOptions.headers = httpOptions.headers.set('Authorization',sessionStorage.getItem("authToken"));    
    return this.http.get<MatTableItem[]>(this.allStatusUrl, httpOptions)
    .pipe(
      catchError(this.handleError('Getting all data ', String))
    );       
  }
}
