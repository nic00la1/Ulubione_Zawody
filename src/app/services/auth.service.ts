import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthResponse } from '../shared/models/AuthResponse';
import { Subject, catchError, tap, throwError } from 'rxjs';
import { User } from '../shared/models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  user = new Subject<User>();

  signUp(email: any, password: any) {
    const data = { email: email, password: password, returnSecureToken: true };
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBo4ZTI74hxnNFqv8D6Cmag6BLrI-Jb5Xc',
        data
      )
      .pipe(catchError(this.handleErrors), tap((res) => {
       this.handleCreateUser(res);
      }));
  }

  
  login(email: any, password: any) {
    const data = { email: email, password: password, returnSecureToken: true };
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBo4ZTI74hxnNFqv8D6Cmag6BLrI-Jb5Xc',
      data
    ).pipe(catchError(this.handleErrors), tap((res) => {
      this.handleCreateUser(res);
    }));
  }

  private handleCreateUser(res : any) {
    const expiresInTs = new Date().getTime() + +res.expiresIn * 1000 // Timestamp for current date and time
    const expiresIn = new Date(expiresInTs);
    const user = new User(res.email, res.localId, res.idToken, expiresIn);
    this.user.next(user);
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
