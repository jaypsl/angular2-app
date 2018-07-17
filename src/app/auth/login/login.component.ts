import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : any = {};

  constructor(private _authservice : AuthService) { }

  ngOnInit() {
  }

  login(){
    // console.log(this.loginForm);
    this._authservice.login(this.loginForm);
  }
}
