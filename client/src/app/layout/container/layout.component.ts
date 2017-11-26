import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css',
    '../../../assets/css/bootstrap.min.css',
    '../../../assets/css/template.css',
    '../../../assets/font-awesome/css/font-awesome.min.css']
})
export class LayoutComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }

}
