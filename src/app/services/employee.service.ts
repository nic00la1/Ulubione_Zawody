import { Injectable, inject } from '@angular/core';
import { Employee } from '../shared/models/Employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  http = inject(HttpClient);

  CreateEmployee(employee: Employee) {
    const headers = new HttpHeaders({ 'my-header': 'hello-world' });
    this.http
      .post(
        'https://my-employees-24871-default-rtdb.europe-west1.firebasedatabase.app/employees.json',
        employee,
        { headers: headers } // add headers to the request
      )
      .subscribe((res) => {
        // Fetch the fresh list of employees
        this.GetAllEmployees().subscribe((employees) => {
          console.log(employees);
        });
      });
  }

  DeleteEmployee(id: string | undefined) {
    this.http
      .delete(
        'https://my-employees-24871-default-rtdb.europe-west1.firebasedatabase.app/employees/' +
          id +
          '.json'
      )
      .subscribe((res) => {
        // Fetch the fresh list of employees
        this.GetAllEmployees().subscribe((employees) => {
          console.log(employees);
        });
      });
  }

  DeleteAllEmployees() {
    this.http
      .delete(
        'https://my-employees-24871-default-rtdb.europe-west1.firebasedatabase.app/employees.json'
      )
      .subscribe((res) => {
        // Fetch the data after deletion
      
      });
  }

  GetAllEmployees() {
    return this.http
      .get<{ [key: string]: Employee }>(
        'https://my-employees-24871-default-rtdb.europe-west1.firebasedatabase.app/employees.json'
      )
      .pipe(
        map((res) => {
          // convert the response to an array of employees
          let employees = [];

          for (let key in res) {
            if (res.hasOwnProperty(key)) {
              employees.push({ ...res[key], id: key });
            }
          }
          return employees;
        })
      );
  }
}
