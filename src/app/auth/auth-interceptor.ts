import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Auth intercepter called!')
  const modifiedReq = req.clone({headers: req.headers.append('auth', 'abcxyz')});
  return next(modifiedReq).pipe(tap((event) => {
    if(event.type === HttpEventType.Response) {
      console.log('Response arrived, body data: ', event.body);
    }
  }));
};
