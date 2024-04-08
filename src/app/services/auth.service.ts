import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthResponse } from '../shared/models/AuthResponse';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from '../shared/models/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  user = new BehaviorSubject<User>(null);
  router = inject(Router);
  private tokenExpirationTimer: any;

  signUp(email, password) {
    const data = { email: email, password: password, returnSecureToken: true };
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBo4ZTI74hxnNFqv8D6Cmag6BLrI-Jb5Xc',
        data
      )
      .pipe(
        catchError(this.handleErrors),
        tap((res) => {
          this.handleCreateUser(res);
        })
      );
  }

  login(email, password) {
    const data = { email: email, password: password, returnSecureToken: true };
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBo4ZTI74hxnNFqv8D6Cmag6BLrI-Jb5Xc',
        data
      )
      .pipe(
        catchError(this.handleErrors),
        tap((res) => {
          this.handleCreateUser(res);
        })
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');

    if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);

    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    const user = JSON.parse(localStorage.getItem('userData'));

    if (!user) return;

    const loggedUser = new User(
      user.email,
      user.id,
      user._token,
      user._tokenExpirationDate
    );

    if (loggedUser.token) {
      this.user.next(loggedUser);
      const timerValue = user._tokenExpirationDate.getTime() - new Date().getTime()
      this.autoLogout(timerValue)
    }
  }

  autoLogout(expireTime: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expireTime);
  }

  private handleCreateUser(res: any) {
    const expiresInTs = new Date().getTime() + +res.expiresIn * 1000; // Timestamp for current date and time
    const expiresIn = new Date(expiresInTs);
    const user = new User(res.email, res.localId, res.idToken, expiresIn);
    this.user.next(user);
    this.autoLogout(res.expiresIn * 1000);

    localStorage.setItem('userData', JSON.stringify(user));
  }
  private handleErrors(err: any) {
    let errorMessage = 'Wystąpił nieznany błąd, spróbuj ponownie później';
    console.log(err);

    if (!err.error || !err.error.error) {
      return throwError(() => errorMessage);
    }
    switch (err.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Ten adres email jest już zajęty';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Ta operacja jest niedozwolona';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Login lub hasło są nieprawidłowe, spróbuj ponownie!';
        break;
    }
    return throwError(() => errorMessage);
  }
}
