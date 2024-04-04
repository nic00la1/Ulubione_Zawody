import { HttpInterceptorFn } from '@angular/common/http';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Logging interceptor called!');
  console.log('Request sent to URL:', req.url);
  return next(req);
};
