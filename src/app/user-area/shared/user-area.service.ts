import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SnackBarService } from '../../core/snackService/snackService.service';
import { AUTH_CONFIG } from './auth0-variables';
import { AuthService } from '../../core/authentication/auth.service';
import { TranslateService } from '@ngx-translate/core';
import * as auth0 from 'auth0-js';

@Injectable()
export class UserAreaService {
  authAlerts: any;

  auth0: any = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: 'token id_token',
    audience: 'urn:service-mesh',
    redirectUri: AUTH_CONFIG.callbackURL,
    scope: 'openid profile email',
  });

  constructor(
    public snackBar: SnackBarService,
    public router: Router,
    public translate: TranslateService,
    public authService: AuthService,
  ) {
    this.translate.get('alerts.authAlerts').subscribe((result: any) => {
      this.authAlerts = result;
    });
  }

  login(): void {
    this.auth0.authorize();
  }

  handleAuthentication(): void {
    this.auth0.parseHash((err: any, authResult: any) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.authService.setToken(authResult.accessToken);

        this.auth0.client.userInfo(authResult.accessToken, (_err: any, data: any) => {
          if (data) {
            const user: any = {
              nickname: data.nickname,
              role:  data['http://mts.local/group'],
            };

            this.setSession(authResult, user);
            this.authService.loadExistingSession();

            this.snackBar.openSnack(
              this.authAlerts.loginSuccess,
              4000,
              'green',
            );
          }
        });

        this.router.navigate(['/restaurant']);
      }
    });
  }

  setSession(authResult: any, user: any): void {
    // Set the time that the access token will expire at
    const expiresAt: any = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('username', user.nickname);
    localStorage.setItem('userrole', user.role);
  }

  register(email: string, password: string): void {
    // tslint:disable-next-line:no-console
    console.log('Not implemented yet.');
  }

  logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('username');
    localStorage.removeItem('userrole');

    this.authService.setUser('');
    this.authService.setRole('CUSTOMER');
    this.authService.setToken('');
    this.authService.setExpiresAt(undefined);

    this.router.navigate(['restarant']);
    this.snackBar.openSnack(this.authAlerts.logoutSuccess, 4000, 'black');
  }

  changePassword(data: any): void {
    // tslint:disable-next-line:no-console
    console.log('Not implemented yet');
  }
}
