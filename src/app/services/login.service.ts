import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams} from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { MatTableItem } from '../model/MatTableItem'
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'authToken'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  socketUrl = 'http://aggregator:9093/socket';
  allStatusUrl = 'http://aggregator:9093/demo/all';
  loginUrl = 'http://aggregator:9093/users/login';
  signUpUrl = 'http://aggregator:9093/users/signUp';
  
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) { 
    this.handleError = httpErrorHandler.createHandleError('LoginService')
  }

  getLogRecord (tableContent: MatTableItem): Observable<User> {
    return this.http.get<User>(this.allStatusUrl, httpOptions);
  }

  getAuthToken(user: User){   
    return this.http.post(this.loginUrl, user, httpOptions)
    .pipe(
      catchError(this.handleError('login', String))
    );
  }

  addUser(user: User){
      user.role = {
        "role": "user"
      }

    return this.http.post(this.signUpUrl, user, httpOptions)
    .pipe(
      catchError(this.handleError('Adding user ', String))
    );
  }

}