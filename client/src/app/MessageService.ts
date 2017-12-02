import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class MessageService {
  private subject = new Subject<any>();

  sendMessage(eventName: string, message: any) {
    this.subject.next({event: eventName, message: message});
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
