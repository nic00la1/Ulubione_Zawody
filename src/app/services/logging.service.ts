import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  http = inject(HttpClient);

  logError(data: { statusCode: number; errorMessage: string; dateTime: Date }) {
    this.http
      .post(
        'https://my-employees-24871-default-rtdb.europe-west1.firebasedatabase.app/log.json',
        data
      )
      .subscribe();
  }

  fetchErrors() {
    this.http
      .get(
        'https://my-employees-24871-default-rtdb.europe-west1.firebasedatabase.app/log.json'
      )
      .subscribe((data) => {
        console.log(data);
      });
  }
}
