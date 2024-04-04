import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  http = inject(HttpClient);

  // Log error to Firebase Realtime Database
  logError(data: { statusCode: number; errorMessage: string; dateTime: Date }) {
    this.http
      .post(
        'https://my-employees-24871-default-rtdb.europe-west1.firebasedatabase.app/log.json',
        data
      )
      .subscribe();
  }

  // Fetch errors from Firebase Realtime Database
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
