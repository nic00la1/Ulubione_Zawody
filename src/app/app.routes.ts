import { DashboardPageComponent } from './components/pages/dashboard-page/dashboard-page.component';
import { Routes } from '@angular/router';
import { OurEmployeesComponent } from './components/pages/our-employees/our-employees';

export const routes: Routes = [
    {path: '', component: DashboardPageComponent},
    {path: 'employees', component: OurEmployeesComponent}

];
