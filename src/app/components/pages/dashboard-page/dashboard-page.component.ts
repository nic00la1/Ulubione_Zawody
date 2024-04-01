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
  showCreateEmployeeForm: boolean = false;
  http = inject(HttpClient);
  allEmployees: Employee[] = [];

  ngOnInit() {
    this.fetchAllEmployees();
  }


  OpenCreateEmployeeForm() {
    this.showCreateEmployeeForm = true;
  }

  CloseCreateEmployeeForm() {
    this.showCreateEmployeeForm = false;
  }

  CreateEmployee(data: Employee) { 
    this.http
      .post(
        'https://my-employees-24871-default-rtdb.europe-west1.firebasedatabase.app/employees.json',
        data
      )
      .subscribe((res) => {
           this.fetchAllEmployees();
      });
  }

  private fetchAllEmployees() {
    this.http
      .get<{ [key: string]: Employee }>(
        'https://my-employees-24871-default-rtdb.europe-west1.firebasedatabase.app/employees.json'
      ).pipe(map((res) => {
        // convert the response to an array of employees
        let employees = [];

        for (let key in res) {
          if (res.hasOwnProperty(key)) {
            employees.push({ ...res[key], id: key });
          }
        }

        return employees;
      }))
      .subscribe((employees) => {
        this.allEmployees = employees;
      });
  }
}
