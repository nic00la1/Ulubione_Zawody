import { DashboardPageComponent } from './components/pages/dashboard-page/dashboard-page.component';
import { Routes } from '@angular/router';
import { NasiPracownicyComponent } from './components/pages/nasi-pracownicy/nasi-pracownicy.component';

export const routes: Routes = [
    {path: '', component: DashboardPageComponent},
    {path: 'pracownicy', component: NasiPracownicyComponent}

];
