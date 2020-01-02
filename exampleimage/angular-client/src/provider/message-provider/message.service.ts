import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppSettings } from 'app/app.settings';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messageDummy: string[] = ['Wenn', 'nicht', 'mehr', 'Zahlen'];

  messagesSubject: Subject<string[]>;

  constructor(private http: HttpClient) {
    this.messagesSubject = new Subject();
  }
  public loadMessages() {

    this.http.get<string[]>(AppSettings.API_ENDPOINT + '/messages')
      .subscribe((result) => {
        this.messagesSubject.next(result);
      });
  }

  public async postMessage(msg: string) {
    await this.http.post(AppSettings.API_ENDPOINT + '/messages',{ text: msg }).toPromise();
    this.loadMessages();
  }

}
