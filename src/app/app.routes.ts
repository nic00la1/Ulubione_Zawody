import { DashboardPageComponent } from './components/pages/dashboard-page/dashboard-page.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { authGuard } from './auth/Guards/auth.guard';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', component: DashboardPageComponent, canActivate: [authGuard]},

];
