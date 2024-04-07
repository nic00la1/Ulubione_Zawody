import {
  HttpEventType,
  HttpInterceptorFn,
  HttpParams,
} from '@angular/common/http';
import { exhaustMap, take, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { User } from '../shared/models/User';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let authService = inject(AuthService);

  return authService.user
    .pipe(
      take(1),
      exhaustMap((user) => {
        if(!user) {
          return next(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token),
        })
        return next(modifiedReq);
      })
    )
};
