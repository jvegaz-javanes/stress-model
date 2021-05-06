import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ApiService } from '../services/api.service';
import { TouchSequence } from 'selenium-webdriver';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  signupForm: FormGroup

  constructor(
    private _builder: FormBuilder,
    private _user: UserService,
    private _api: ApiService
  ) { 
    this.signupForm = this._builder.group(
      {
        
        user: ['', Validators.compose([Validators.email, Validators.required])],
        password: ['', Validators.required]
      }
    )
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }
    }

  ngOnInit() {
    this.signupForm = this._builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    }

login(user:string, password: string){
 // console.log('llamando login');

  //const user = (document.querySelector('#user') as HTMLInputElement).value;
  //const password = (document.querySelector('#pasword') as HTMLInputElement).value;

  this._api.login(user, password).subscribe( data =>{
    this._user.user = data.user
    console.log("HOLA MAU MOROCHA", this._user.user)
  });
  
}

}