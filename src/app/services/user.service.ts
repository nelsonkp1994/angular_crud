import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.baseUrl;
  private users = '/api/users';
  private userInfo = '/api/user/info';
  private addUser = '/api/user/add';
  private updateUser = '/api/user/update';
  private deleteUser = '/api/user/delete';

  constructor(private http: HttpClient) { }

  //Get Users
  getUsersList(): Observable<any> {
    return this.http.post<any>(this.baseUrl + this.users,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } });
  }

  getUserInfo(arrayData): Observable<any> {
    return this.http.post<any>(this.baseUrl + this.userInfo, arrayData.toString(),
      {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}});
  }

  addUserData(arrayData): Observable<any> {
    return this.http.post<any>(this.baseUrl + this.addUser, arrayData.toString(),
      {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}});
  }

  updateUserData(arrayData): Observable<any> {
    return this.http.post<any>(this.baseUrl + this.updateUser, arrayData.toString(),
      {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}});
  }

  deleteUserData(arrayData): Observable<any> {
    return this.http.post<any>(this.baseUrl + this.deleteUser, arrayData.toString(),
      {headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}});
  }

}
