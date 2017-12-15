import {Component} from '@angular/core';
import {SendVia} from "./models/sendVia";
import {SendViaService} from "./services/send-via.service";
import {SEND_VIA_DATA} from "./models/sendVia-data";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',
    '../assets/css/bootstrap.min.css',
    '../assets/css/template.css',
    '../assets/font-awesome/css/font-awesome.min.css',
  ]
})
export class AppComponent {
  sendViaAll: SendVia[] = SEND_VIA_DATA;

  constructor(private sendViaService: SendViaService) {
  }

  ngOnInit() {
    this.insertSendVia();
  }

  insertSendVia() {
    this.sendViaAll.forEach(sendVia => {
      this.sendViaService.insertSendVia(sendVia)
        .subscribe(resp => {
        });
    });
  }
}
