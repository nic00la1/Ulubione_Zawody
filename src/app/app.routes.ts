import { DashboardPageComponent } from './components/pages/dashboard-page/dashboard-page.component';
import { Routes } from '@angular/router';
import { OurEmployeesComponent } from './components/pages/employees/employees';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';

export const routes: Routes = [
    {path: '', redirectTo: 'employees', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardPageComponent},
    {path: 'employees', component: OurEmployeesComponent},
    {path: 'login', component: LoginPageComponent}
];
