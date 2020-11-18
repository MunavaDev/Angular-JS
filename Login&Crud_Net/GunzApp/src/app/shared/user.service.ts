import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from './user.model';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(user: User, roles: string[]) {
    const body = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName,
      Roles: roles
    };
    const reqHeader = new HttpHeaders({'No-Auth': 'True'});
    return this.http.post(environment.ApiURL + '/api/User/Register', body, {headers : reqHeader});
  }

  userAuthentication(userName, password) {
    const data = 'username=' + userName + '&password=' + password + '&grant_type=password';
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    return this.http.post(environment.ApiURL + '/token', data, { headers: reqHeader });
  }

  getUserClaims() {
   return  this.http.get(environment.ApiURL + '/api/GetUserClaims');
  }

  getAllRoles() {
    const reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.get(environment.ApiURL + '/api/GetAllRoles', { headers: reqHeader });
  }

  roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles: string[] = JSON.parse(localStorage.getItem('userRoles'));
    allowedRoles.forEach(element => {
      if (userRoles.indexOf(element) > -1) {
        isMatch = true;
        return false;
      }
    });
    console.log(userRoles);
    return isMatch;

  }
}
