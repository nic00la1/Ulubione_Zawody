import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Person } from '../../shared/models/Person.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  createDb() {
    const people = [
      { id: 1, name: 'Jan', surname: 'Kowalski', proffesion: 'Programista', age: 32 },
      { id: 2, name: 'Anna', surname: 'Nowak', proffesion: 'Designer', age: 24 },
      { id: 3, name: 'Piotr', surname: 'Wójcik', proffesion: 'Inżynier', age: 28 },
      { id: 4, name: 'Magdalena', surname: 'Kowalczyk', proffesion: 'Architekt', age: 35 },
      { id: 5, name: 'Krzysztof', surname: 'Mazur', proffesion: 'Analityk', age: 30 },
      { id: 6, name: 'Alicja', surname: 'Jankowska', proffesion: 'Grafik', age: 26 },
      { id: 7, name: 'Tomasz', surname: 'Kaczmarek', proffesion: 'Tester', age: 31 },
      { id: 8, name: 'Karolina', surname: 'Zając', proffesion: 'Project Manager', age: 33 },
      { id: 9, name: 'Adam', surname: 'Wojciechowski', proffesion: 'Administrator', age: 29 },
      { id: 10, name: 'Natalia', surname: 'Sikora', proffesion: 'Copywriter', age: 27 },
      { id: 11, name: 'Michał', surname: 'Adamczyk', proffesion: 'Frontend Developer', age: 34 },
      { id: 12, name: 'Monika', surname: 'Dąbrowska', proffesion: 'Backend Developer', age: 32 }
    ];
    return {people};
  }

    // Overrides the genId method to ensure that a person always has an id.
  // If the people array is empty,
  // the method below returns the initial number (11).
  // if the people array is not empty, the method below returns the highest
  // hero id + 1.
  genId(people: Person[]): number {
    return people.length > 0 ? Math.max(...people.map(person => person.id)) + 1 : 11;
  }
}
