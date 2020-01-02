import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from 'app/app.settings';
@Component({
  selector: 'my-bug-report',
  templateUrl: './bug-report.component.html',
  styleUrls: ['./bug-report.component.css']
})
export class BugReportComponent implements OnInit {

  title = 'Report a bug';
  shortDescription = '';
  constructor(private http:HttpClient) { }

  ngOnInit() {
  }

  submit(){
    this.http.post(AppSettings.API_ENDPOINT + '/bugreport', { text: this.shortDescription}).toPromise().catch((err)=> alert("Error: " + err));
  }

}
