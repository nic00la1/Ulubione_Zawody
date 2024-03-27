import { Injectable, inject } from '@angular/core';
import { Person } from '../../shared/models/Person.model';
import { PERSONS } from '../../shared/constants/Persons';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from '../message/message.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  
  private peopleUrl = 'api/people';  // URL to web api

  private http = inject(HttpClient);
  private messageService = inject(MessageService);

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private log(message: string) {
    this.messageService.add(`PersonService: ${message}`);
  }

  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.peopleUrl)
    .pipe(
    tap(_ => this.log('fetched people')),
    catchError(this.handleError<Person[]>('getPersons', []))
    );
  }

  getPerson(id: number) : Observable<Person> {
    const url = `${this.peopleUrl}/${id}`;
    return this.http.get<Person>(url).pipe(
      tap(_ => this.log(`fetched person id=${id}`)),
      catchError(this.handleError<Person>(`getPerson id=${id}`))
    );
  }

  updatePerson(updatedPerson : Person) : void {
    const index = PERSONS.findIndex(person => person.id === updatedPerson.id);
    if (index !== -1) {
      PERSONS[index] = updatedPerson;
      this.log(`Updated person with id ${updatedPerson.id}`);
    }
  }

addPerson(person: Person): Observable<Person> {
  return this.http.post<Person>(this.peopleUrl, person, this.httpOptions).pipe(
    tap((newPerson: Person) => this.log(`added person with id=${newPerson.id}`)),
    catchError(this.handleError<Person>('addPerson'))
  );
}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
