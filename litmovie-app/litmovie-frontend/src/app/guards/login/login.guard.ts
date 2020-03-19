import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Appconstant } from 'src/app/utils/appconstant';
import { Localcookie } from 'src/app/utils/localcookie';
import { LoginService } from 'src/app/services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private cookieservice: CookieService,
    private appconstant: Appconstant,
    private localCookie: Localcookie,
    public router: Router, private logoutService: LoginService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    if (this.cookieservice.check(this.appconstant.logincookie) === false
      || JSON.parse(this.cookieservice.get(this.appconstant.logincookie)).status === false) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }


}
