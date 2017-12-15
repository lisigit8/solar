import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map'
import {Users} from "../models/users";
import {apiUrl} from "./common";
import {WarrentyDetails} from "../models/warrentyDetails";

@Injectable()
export class AuthenticationService {
  public token: string;

  constructor(private http: HttpClient) {
  }

  login(obj: Users) {
    return this.http.post(`${apiUrl}login`, obj)
      .map((response: any) => {
        // login successful if there's a jwt token in the response
        let token = response.token;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser',
            JSON.stringify({
              userId: obj.userId,
              roles: response.user.roles,
              name: response.user.name,
              token: token
            }));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  checkLogin() {
    return this.http.get(`${apiUrl}check-login/${JSON.parse(localStorage.getItem('currentUser')).userId}`, {
      headers: new HttpHeaders({
        'token':
          localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).token : ''
      })
    });
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }
}
