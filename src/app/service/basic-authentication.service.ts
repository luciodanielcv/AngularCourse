import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export const TOKEN= 'token';
export const AUTHENTICATED_USER = 'authenticatedUser';


@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http: HttpClient) { }

  createBasicAuthenticationHttpHeader(username, password) {

    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    return basicAuthHeaderString;

  }

  executeAuthenticationService(username, password) {
    //return this.http.get<HelloWorldBean>(`http://localhost:8080/hello-world/path-variable/${name}`)
    console.log(username);
    console.log(password)
    let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader(username, password);
    console.log("encoded header: " + basicAuthHeaderString);
    let headers = new HttpHeaders(
      {
        Authorization: basicAuthHeaderString
      }
    );


    return this.http.get<AuthenticationBean>(`http://localhost:8080/basicauth`, {
      headers
    }).pipe(
      map(
        data => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, basicAuthHeaderString);

          return data;
        },
        error => {
          console.log(error);
        }
      )
    );
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem(TOKEN);
    }
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null);
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }
}


export class AuthenticationBean {

  constructor(public message: string) {

  }

}