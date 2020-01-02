import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MateService } from 'provider/mate-provider/mate.service';

@Component({
  selector: 'my-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private mateProvider: MateService) { }

  ngOnInit() {
  }

  firstname: string;
  surname: string;
  email: string;
  username_r: string;
  password_r: string;

  user: Array<string> = [];

  username: string;
  password: string;
  
  login() {
    this.mateProvider.validateLogin(this.username, this.password);
    this.user = [];
  }

  register() {
    this.user.push(this.firstname);
    this.user.push(this.surname);
    this.user.push(this.email);
    this.user.push(this.username_r);
    this.user.push(this.password_r);
    this.mateProvider.registerNewUser(this.user)
    this.user = [];
  }
}
