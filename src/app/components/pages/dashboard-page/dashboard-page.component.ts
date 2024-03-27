import { Component, inject } from '@angular/core';
import { MessageComponent } from '../../partials/message/message.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PersonService } from '../../../services/person/person.service';
import { Person } from '../../../shared/models/Person.model';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [MessageComponent, FormsModule, CommonModule],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {
  
  personService = inject(PersonService)
  persons : Person[] = [];
  
  add(name: string, surname: string, age: number, position: string): void {
    name = name.trim();
    surname = surname.trim();
    position = position.trim();
  
    if (!name || !surname || !position || !age) { return; }
    this.personService.addPerson({ name, surname, age, position } as unknown as Person)
      .subscribe(person => {
        this.persons.push(person);
      });
  }
}
