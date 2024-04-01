import { Component, OnInit, inject } from '@angular/core';
import { MessageComponent } from '../../partials/message/message.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OurEmployeesComponent } from './employees/employees';
import { Employee } from '../../../shared/models/Employee';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [MessageComponent, FormsModule, CommonModule, OurEmployeesComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css',
})
export class DashboardPageComponent implements OnInit {
  http = inject(HttpClient);

  ngOnInit() {
    this.fetchAllEmployees();
  }

  CreateEmployee(data: Employee) {
    this.http
      .post(
        'https://my-employees-24871-default-rtdb.europe-west1.firebasedatabase.app/employees.json',
        data
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  private fetchAllEmployees() {
    this.http
      .get<{ [key: string]: Employee }>(
        'https://my-employees-24871-default-rtdb.europe-west1.firebasedatabase.app/employees.json'
      ).pipe(map((res) => {
        // convert the response to an array of employees
        const employees = [];

        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            employees.push({ ...res[key], id: key });
          }
        }

        return employees;
      }))
      .subscribe((res) => {
        console.log(res);
      });
  }
}
