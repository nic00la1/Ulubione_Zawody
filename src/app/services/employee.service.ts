import { Injectable, inject } from '@angular/core';
import { Employee } from '../shared/models/Employee';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Subject, catchError, map, throwError } from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  http = inject(HttpClient);
  loggingService = inject(LoggingService);
  errorSubject = new Subject<HttpErrorResponse>();

  CreateEmployee(employee: Employee) {
    const headers = new HttpHeaders({ 'my-header': 'hello-world' });
    this.http
      .post(
        'https://my-employeesxxxx-24871-default-rtdb.europe-west1.firebasedatabase.app/employees.json',
        employee,
        { headers: headers } // add headers to the request
      )
      .pipe(
        catchError((err) => {
          // Write the logic to log errors
          const errorObj = {
            statusCode: err.status,
            errorMessage: err.message,
            dateTime: new Date(),
          };
          this.loggingService.logError(errorObj);
          return throwError(() => err);
        })
      )
      .subscribe({
        error: (err) => {
          this.errorSubject.next(err);
        },
      });
  }

  DeleteEmployee(id: string | undefined) {
    this.http
      .delete(
        'https://my-employees-24871-default-rtdb.europe-west1.firebasedatabase.app/employees/' +
          id +
          '.json'
      )
      .pipe(
        catchError((err) => {
          // Write the logic to log errors
          const errorObj = {
            statusCode: err.status,
            errorMessage: err.message,
            dateTime: new Date(),
          };
          this.loggingService.logError(errorObj);
          return throwError(() => err);
        })
      )
      .subscribe({
        error: (err) => {
          this.errorSubject.next(err);
        },
      });
  }

  DeleteAllEmployees() {
    this.http
      .delete(
        'https://my-employees-24871-default-rtdb.europe-west1.firebasedatabase.app/employees.json'
      )
      .pipe(
        catchError((err) => {
          // Write the logic to log errors
          const errorObj = {
            statusCode: err.status,
            errorMessage: err.message,
            dateTime: new Date(),
          };
          this.loggingService.logError(errorObj);
          return throwError(() => err);
        })
      )
      .subscribe({
        error: (err) => {
          this.errorSubject.next(err);
        },
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
        }),
        catchError((err) => {
          // Write the logic to log errors
          const errorObj = {
            statusCode: err.status,
            errorMessage: err.message,
            dateTime: new Date(),
          };
          this.loggingService.logError(errorObj);
          return throwError(() => err);
        })
      );
  }

  UpdateEmployee(id: string | undefined, data: Employee) {
    this.http
      .put(
        'https://my-employees-24871-default-rtdb.europe-west1.firebasedatabase.app/employees/' +
          id +
          '.json',
        data
      )
      .pipe(
        catchError((err) => {
          // Write the logic to log errors
          const errorObj = {
            statusCode: err.status,
            errorMessage: err.message,
            dateTime: new Date(),
          };
          this.loggingService.logError(errorObj);
          return throwError(() => err);
        })
      )
      .subscribe({
        error: (err) => {
          this.errorSubject.next(err);
        },
      });
  }
}
