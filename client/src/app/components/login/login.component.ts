import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {Users} from "../../models/users";
import {pathName} from "../../services/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../app.component.css']
})
export class LoginComponent implements OnInit {

  model: Users = new Users;
  loading = false;
  error = '';
  pathName: string = pathName;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model)
      .subscribe(result => {
        if (result === true) {
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);
        } else {
          this.error = 'UserId or password is incorrect';
          this.loading = false;
        }
      });
  }

}
