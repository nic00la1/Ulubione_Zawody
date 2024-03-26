import { Component, inject } from '@angular/core';
import { Person } from '../../../shared/models/Person.model';
import { PersonService } from '../../../services/person.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'our-employees',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './our-employees.html',
  styleUrl: './our-employees.css'
})
export class OurEmployeesComponent {
  persons!:Person[]
  selectedPerson !: Person;
  personService = inject(PersonService)

  ngOnInit() {
    this.getPersons();
  }

  getPersons() : void {
    this.persons = this.personService.getPersons();
  }

  selectPerson(person: Person) {
    this.selectedPerson = person; // Change this line
  }
}
