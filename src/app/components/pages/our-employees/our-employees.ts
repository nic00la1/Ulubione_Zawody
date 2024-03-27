import { Observable } from 'rxjs';
import { Component, Input, inject } from '@angular/core';
import { Person } from '../../../shared/models/Person.model';
import { PersonService } from '../../../services/person/person.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../../services/message/message.service';
@Component({
  selector: 'our-employees',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './our-employees.html',
  styleUrl: './our-employees.css'
})
export class OurEmployeesComponent {
  persons : Person[] = [];
  @Input() selectedPerson ?: Person;
  personService = inject(PersonService)
  messageService = inject(MessageService)

  ngOnInit() {
    this.getPersons();
  }

  getPersons() : void {
    this.personService.getPersons().subscribe(persons => this.persons = persons);
  }

  selectPerson(person: Person) {
    this.selectedPerson = person; // Change this line
    this.messageService.add(`Wybrano osobe o imieniu: ${person.name}`);
  }

  updatePerson(updatedPerson : Person) : void {
    this.personService.updatePerson(updatedPerson);
  }

  
}
