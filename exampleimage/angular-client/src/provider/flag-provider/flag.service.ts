import { Injectable } from '@angular/core';
import { Subject, Observable, interval } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from 'app/app.settings';

@Injectable({
  providedIn: 'root'
})
export class FlagService {

  private flags = [];
  private secondsCounter: Observable<any>;
  public flagSubject: Subject<string[]>;

  constructor(private http: HttpClient) {
    this.flagSubject = new Subject();
    
  }

  public getFlags(): Subject<string[]>{

    this.refreshData();
    return this.flagSubject;

  }

  public refreshData(): void {

    this.secondsCounter = interval(2000);
    this.secondsCounter.subscribe(() => {
      this.http.get(AppSettings.API_ENDPOINT + '/flags').subscribe((flags: string[]) => {
        if (flags.length != this.flags.length) {
          this.flags = flags;
          this.flagSubject.next(this.flags);
        }
    
      });
    });

  }


}
