import { DashboardPageComponent } from './components/pages/dashboard-page/dashboard-page.component';
import { Routes } from '@angular/router';
import { OurEmployeesComponent } from './components/pages/dashboard-page/employees/employees';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';

export const routes: Routes = [
    {path: '', component: DashboardPageComponent},
    {path: 'login', component: LoginPageComponent}
];
