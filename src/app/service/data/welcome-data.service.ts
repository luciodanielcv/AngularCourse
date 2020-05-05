import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

export class HelloWorldBean {
  constructor(public message: string) { }

}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(
    private http: HttpClient,
  ) { }

  // createBasicAuthenticationHttpHeader(){
  //   let username = 'user'
  //   let password= 'password'
  //   let basicAuthHEaderString = 'Basic ' + window.btoa(username + ':' + password);
  //   return basicAuthHEaderString;

  // }

  executeHelloWorldBeanService() {
    return this.http.get<HelloWorldBean>("http://localhost:8080/hello-world-bean")
  }

  executeHelloWorldBeanServiceWithPathVariable(name) {
    //return this.http.get<HelloWorldBean>(`http://localhost:8080/hello-world/path-variable/${name}`)
    // let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader();
    // let headers = new HttpHeaders(
    //   {
    //     Authorization: basicAuthHeaderString
    //   }
    // );


    //TODO LDCV Modify this to show the hello-world message. It might need a subscribe to return the data.    
    return this.http.get<HelloWorldBean>(
      `http://localhost:8080/hello-world/path-variable/${name}`,
      //{headers}
    );
  }


}
