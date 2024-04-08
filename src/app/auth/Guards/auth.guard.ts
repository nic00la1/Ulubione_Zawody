import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable, map, take } from 'rxjs';

export const authGuard: CanActivateFn = (
  route,
  state
):
  | boolean
  | UrlTree
  | Promise<boolean | UrlTree>
  | Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user.pipe(
    take(1),
    map((user) => {
      const loggedIn = user ? true : false;
      if (loggedIn) return true;
      return router.createUrlTree(['/login']);
    })
  );
};
