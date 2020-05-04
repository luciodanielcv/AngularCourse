import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor( private http: HttpClient) { }

  createBasicAuthenticationHttpHeader( username, password ){
    let basicAuthHEaderString = 'Basic ' + window.btoa(username + ':' + password);
    return basicAuthHEaderString;

  }

  executeAuthenticationService( username, password ){
    //return this.http.get<HelloWorldBean>(`http://localhost:8080/hello-world/path-variable/${name}`)
    let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader( username, password );
    let headers = new HttpHeaders(
      {
        Authorization: basicAuthHeaderString
      }
    );


    return this.http.get<AuthenticationBean>("http://localhost:8080/basicauth", {
      headers
    }).pipe(
      map(
        data=>{
          sessionStorage.setItem('authenticatedUser', username);
          return data;
        }
      )
    );
  }


  isUserLoggedIn(){
    let user = sessionStorage.getItem('authenticatedUser');
    return !(user === null);
  }

  logout(){
    sessionStorage.removeItem('authenticatedUser');
  }
}


export class AuthenticationBean{

  constructor( public message: string){

  }

}