import { Injectable } from '@angular/core';
import { Person } from '../../shared/models/Person.model';
import { PERSONS } from '../../shared/constants/Persons';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  getPersons(): Person[] {
    return PERSONS;
  }

  getPerson(id: number): Person {
    return PERSONS.find(person => person.id === id) as Person;
  }

  updatePerson(updatedPerson : Person) : void {
    const index = PERSONS.findIndex(person => person.id === updatedPerson.id);
    if (index !== -1) {
      PERSONS[index] = updatedPerson;
    }
  }
}
