import { Component, OnInit } from '@angular/core';
import { FlagService } from 'provider/flag-provider/flag.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FlagDialog } from './flags/flag.dialogue';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppSettings } from './app.settings';
import { httpClientInMemBackendServiceFactory } from 'angular-in-memory-web-api';

@Component({
  selector: 'my-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'BottleNet';
  public flags: string[] = [];
  public notificationCount = 0;

  constructor(private flagService: FlagService, private dialog: MatDialog, private cookieService: CookieService, private http: HttpClient) {

  }

  public showFlags() {
    let dialogRef = this.dialog.open(FlagDialog, {
      height: '400px',
      width: '600px',
      data: { flags: this.flags }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.notificationCount = 0;
    });
  }

  ngOnInit(): void {

    // Only get cookies when visiting profile
    // if (!this.cookieService.check('id')) {
    //   let id: string = ''
    //   for (let i = 0; i < 40; ++i) {
    //     id += Math.floor(Math.random() * 10);
    //   }
    //   this.cookieService.set('id', id);
    // }

    // if (!this.cookieService.check('session')) {

    //   const params = new HttpParams()
    //     .set('id', this.cookieService.get('id'));
    //   this.http.get(AppSettings.API_ENDPOINT + '/session', { params }).subscribe((res: any) => {
    //     this.cookieService.set('session', res.session);
    //   });

    // }

    this.flagService.getFlags().subscribe((flags => {
      this.notificationCount = flags.length - this.flags.length;
      this.flags = flags;
    }));
  }
}


