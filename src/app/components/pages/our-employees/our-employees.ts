import { Component, inject } from '@angular/core';
import { Person } from '../../../shared/models/Person.model';
import { PersonService } from '../../../services/person.service';

@Component({
  selector: 'our-employees',
  standalone: true,
  imports: [],
  templateUrl: './our-employees.html',
  styleUrl: './our-employees.css'
})
export class OurEmployeesComponent {
  persons!:Person[]
  personService = inject(PersonService)

  ngOnInit() {
    this.getPersons();
  }

  getPersons() : void {
    this.persons = this.personService.getPersons();
  }
}
