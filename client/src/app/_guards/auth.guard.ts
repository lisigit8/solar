import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(route.data.pageName);

    if (localStorage.getItem('currentUser')) {
      if((JSON.parse(localStorage.getItem('currentUser')).userRolls.indexOf("Admin") > -1)){
        return true;
      }else{
        this.router.navigate(['/unauthorized']);
        return false;
      }
    } else {
      // not logged in so redirect to login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}
