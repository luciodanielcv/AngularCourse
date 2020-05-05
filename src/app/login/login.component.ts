import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = ''
  password = ''
  errorMessage = 'Invalid credentials'
  invalidLogin = false

  //Router to welcome page
  //Dependency injection
  constructor(private router: Router,
    private basicAuthenticationService: BasicAuthenticationService,
    private hardcodedAuthenticationService: HardcodedAuthenticationService
    ) { }

  handleLogin(){
    //console.log( "handleLogin()" );
    //console.log( this.username );
    //console.log(this.password);

    if( this.hardcodedAuthenticationService.authenticate(this.username, this.password) ){
      
      //LDCV Redirect to welcome page
      //router was defined in the constructor.
      this.router.navigate(['welcome', this.username])
      this.invalidLogin = false

    }else{
      this.invalidLogin = true
    }

    
  }

  

  handleJwtAuthLogin(){

    //console.log( 'Logging user: ' + this.username );
    //console.log( 'With password: ' + this.password);
    this.basicAuthenticationService.executeJwtAuthenticationService(this.username, this.password).subscribe(
      data => {
          console.log( data );
      this.router.navigate(['welcome', this.username])
      this.invalidLogin = false

    },
        error => {
          console.log( error )
          this.invalidLogin = true
        }
    )
      
      
    
  }


  handleBasicAuthLogin(){

    //console.log( 'Logging user: ' + this.username );
    //console.log( 'With password: ' + this.password);
    this.basicAuthenticationService.executeAuthenticationService(this.username, this.password).subscribe(
      data => {
          console.log( data );
      this.router.navigate(['welcome', this.username])
      this.invalidLogin = false

    },
        error => {
          console.log( error )
          this.invalidLogin = true
        }
    )
      
      
    
  }

  

  ngOnInit(): void {
  }

}
