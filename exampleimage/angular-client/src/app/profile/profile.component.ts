import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from 'provider/message-provider/message.service';
import { MatInput } from '@angular/material';
import { encode } from 'punycode';
import { unescapeHtml } from '@angular/platform-browser/src/browser/transfer_state';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AppSettings } from 'app/app.settings';
import { Subject } from 'rxjs';

@Component({
  selector: 'my-test-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  title = 'Profile';

  profileText = {username:"Hackers Username", firstname:"Hacker", lastname:"Attacker", email:"att@mail.com", password:"geheim", verify:"geheim", pic: "/assets/dummy.png" };
  @ViewChild('newMessage')
  newMessage: any;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  ngOnInit() {

    let subscription = new Subject();
    subscription.subscribe(() => {
      const params = new HttpParams()
        .set('id', this.cookieService.get('id'))
        .set('session', this.cookieService.get('session'));

      this.http.get(AppSettings.API_ENDPOINT + '/profile', { params }).subscribe((res: any) => this.profileText = res.some);
    });


    if (!this.cookieService.check('id')) {
      let id: string = ''
      for (let i = 0; i < 40; ++i) {
        id += Math.floor(Math.random() * 10);
      }
      this.cookieService.set('id', id);
    }

    if (!this.cookieService.check('session')) {

      const params = new HttpParams()
        .set('id', this.cookieService.get('id'));
      this.http.get(AppSettings.API_ENDPOINT + '/session', { params }).subscribe((res: any) => {
        this.cookieService.set('session', res.session);
        subscription.next();
      });

    } else {
      subscription.next();
    }

    



  }


}
