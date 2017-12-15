import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(route.data);

    if (localStorage.getItem('currentUser')) {
      return true;
    } else {
      // not logged in so redirect to login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}
