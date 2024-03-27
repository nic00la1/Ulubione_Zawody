import { Injectable, inject } from '@angular/core';
import { Person } from '../../shared/models/Person.model';
import { PERSONS } from '../../shared/constants/Persons';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from '../message/message.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  
  private peopleUrl = 'api/people';  // URL to web api

  private http = inject(HttpClient);
  private messageService = inject(MessageService);

  private log(message: string) {
    this.messageService.add(`PersonService: ${message}`);
  }

  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.peopleUrl);
  }


  updatePerson(updatedPerson : Person) : void {
    const index = PERSONS.findIndex(person => person.id === updatedPerson.id);
    if (index !== -1) {
      PERSONS[index] = updatedPerson;
    }
  }

}
