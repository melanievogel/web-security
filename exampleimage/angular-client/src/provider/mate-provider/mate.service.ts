import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from 'app/app.settings';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MateService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  private resp: any;

  public validateLogin(uname: string, psw: string): any {
    this.httpClient.get(AppSettings.API_ENDPOINT + '/login', {
      params: {username: uname, password: psw}, 
      observe:'response'}).subscribe(res=>{
        if(res.status == 200){
          return this.router.navigateByUrl("/");
        }
      }, error=>{
        if(error.status == 401){
          alert("Your username or password is wrong. Please try again.");
        }
        else if(error.status == 403){
          alert("You entered a wrong password three times. Your account is now locked for a minute.");
        }else{
          alert("Your username or password is wrong. Please try again. You can try 3 times, then you have to wait a minute.");
        }
      })
  }

  public registerNewUser(userProp: string[]): any{
    this.httpClient.get(AppSettings.API_ENDPOINT + '/register', {
      params: {user: userProp}, 
      observe:'response'}).subscribe(res=>{
      if(res.status == 201){
        return this.router.navigateByUrl("/");
      }
    })
  }
}