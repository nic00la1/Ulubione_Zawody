import { Injectable } from '@angular/core';
import { Employee } from '../shared/models/Employee';
import { sample_employees } from '../../data';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

  getAll() : Employee[] {
    return sample_employees
  }

  getEmployeeById(id: string) : Employee {
    return this.getAll().find(employee => employee.id === id) ?? new Employee();
  }
}
