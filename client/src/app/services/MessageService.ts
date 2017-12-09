import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class MessageService {
  private subject = new Subject<any>();
  message: string;

  add(message: string) {
    this.message=message;
  }

  sendMessage(eventName: string, data: any) {
    this.subject.next({event: eventName, data: data});
  }

  clearMessage() {
    this.subject.next();
    this.message = '';
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
