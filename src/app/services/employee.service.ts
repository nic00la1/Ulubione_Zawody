import { Injectable, inject } from '@angular/core';
import { Employee } from '../shared/models/Employee';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import {
  Subject,
  catchError,
  exhaustMap,
  map,
  take,
  tap,
  throwError,
} from 'rxjs';
import { LoggingService } from './logging.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  http = inject(HttpClient);
  loggingService = inject(LoggingService);
  errorSubject = new Subject<HttpErrorResponse>();
  authService = inject(AuthService);

  CreateEmployee(employee: Employee) {
    const headers = new HttpHeaders({ 'my-header': 'hello-world' });
    this.http
      .post(
        'https://my-employees-24871-default-rtdb.europe-west1.firebasedatabase.app/employees.json',
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
        'https://my-employees-24871-default-rtdb.europe-west1.firebasedatabase.app/employees.json',
        { observe: 'events', responseType: 'json' }
      )
      .pipe(
        tap((event) => {
          console.log(event);
          if (event.type === HttpEventType.Sent) {
          }
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
      )
      .subscribe({
        error: (err) => {
          this.errorSubject.next(err);
        },
      });
  }

  GetAllEmployees() {
    return this.http
      .get(
        'https://my-employees-24871-default-rtdb.europe-west1.firebasedatabase.app/employees.json'
      )
      .pipe(
        map((res) => {
          // convert the response to an array of employees
          let employees = [];
          console.log(res);
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

  getEmployeeInfo(id: string | undefined) {
    return this.http
      .get(
        'https://my-employees-24871-default-rtdb.europe-west1.firebasedatabase.app/employees/' +
          id +
          '.json'
      )
      .pipe(
        map((res) => {
          console.log(res);
          let employee = {};
          employee = { ...res, id: id };
          return employee;
        })
      );
  }
}
