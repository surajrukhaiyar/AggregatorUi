
import { HttpClient, HttpErrorResponse, HttpHeaders,HttpRequest, HttpResponse} from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatTableItem } from '../model/MatTableItem';
import { map } from 'rxjs/operators';

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

  allStatusUrl = 'http://10.2.14.43:9093/demo/all';
 
  constructor(private http : HttpClient) {}

  getLogRecord(){
    httpOptions.headers = httpOptions.headers.set('Authorization',sessionStorage.getItem("authToken"));    
    return this.http.get<MatTableItem[]>(this.allStatusUrl, httpOptions);       
  }
}
