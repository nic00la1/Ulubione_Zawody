import { Injectable, inject } from '@angular/core';
import { Employee } from '../shared/models/Employee';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
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
    // purpose of the headers is to tell the server what kind of data we are sending
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json');
    headers = headers.append('content-type', 'text/html')
    // the set method returns new instances after modyfing the header
    // append method appends new value to the existing header

    // pagination and filtering
    let queryParams = new HttpParams();
    queryParams = queryParams.set('page', 2)
    queryParams = queryParams.set('item', 10)
    

    return this.http
      .get<{ [key: string]: Employee }>(
        'https://my-employees-24871-default-rtdb.europe-west1.firebasedatabase.app/employees.json' 
        , {headers: headers, params: queryParams}
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
