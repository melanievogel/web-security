import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from 'provider/message-provider/message.service';
import { MatInput } from '@angular/material';
import { encode } from 'punycode';
import { unescapeHtml } from '@angular/platform-browser/src/browser/transfer_state';

@Component({
  selector: 'my-test',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})

export class TestComponent implements OnInit {
  title = '';

  messages: any[] = ["",""];

  @ViewChild('newMessage')
  newMessage: any;

  constructor(private sanitizer: DomSanitizer, private messageProvider: MessageService) { }

  ngOnInit() {
    let parser: DOMParser = new DOMParser();
    var lt = new RegExp("&lt;", 'g');
    var gt = new RegExp("&gt;", 'g');
    this.messageProvider.messagesSubject.subscribe((messages) => {
      this.messages = messages

        .map(text => parser.parseFromString(text, 'text/html'))
        .map(doc => doc.documentElement.outerHTML)
        .map(str => str.replace(lt, "<").replace(gt, '>'))
        .map(this.sanitizer.bypassSecurityTrustHtml);

    });
    this.messageProvider.loadMessages();
  }

  submit() {
    let message = this.newMessage.nativeElement.value;
    this.messageProvider.postMessage(message);
    this.newMessage.nativeElement.value = '';
  }

}
