import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  message = 'Some welcome message - LDCV'
  messageFromService = '';
  name = ''

  //ActivatedRouter
  constructor(private route:ActivatedRoute,
    private service: WelcomeDataService) { 



  }

  getWelcomeMessageWithParameter(){
    this.service.executeHelloWorldBeanServiceWithPathVariable(this.name).subscribe(
      response => this.handleSuccessfulResponse( response ),
      error => this.handleFailureResponse(error)
    );

  }
  getWelcomeMessage(){
    this.service.executeHelloWorldBeanService().subscribe(
      response => this.handleSuccessfulResponse( response ),
      error => this.handleFailureResponse(error)
    );
  }

    handleSuccessfulResponse(response){
      console.log( response );
      console.log( response.message );
      this.messageFromService = response.message;
    }
    handleFailureResponse( error ){
      console.log( error );
      console.log( error.error );
      console.log( error.error.message );
      this.messageFromService = error.error.message;
    }

  ngOnInit(): void {
    
    console.log(this.route.snapshot.params['name'] )
    this.name = this.route.snapshot.params['name']
  }

}
