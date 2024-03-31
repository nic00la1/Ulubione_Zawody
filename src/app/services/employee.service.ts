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

  onDelete(employeeList: Employee[], item: Employee): Employee[] {
    const isDelete = confirm('Jesteś pewny, że chcesz usunąć tego pracownika?');
    if (isDelete) {
      const currentRecord = employeeList.findIndex((x) => x.id === item.id);
      employeeList.splice(currentRecord, 1);
      localStorage.setItem('angular17crud', JSON.stringify(employeeList));
    }
    return employeeList;
  }

  onEdit(item: Employee): Employee {
    return item;
  }

  updateEmployee(employeeList: Employee[], employeeObj: Employee): Employee[] {
    const currentRecord = employeeList.find((x) => x.id === employeeObj.id);
    if (currentRecord != undefined) {
      currentRecord.name = employeeObj.name;
      currentRecord.surname = employeeObj.surname;
      currentRecord.email = employeeObj.email;
      currentRecord.profession = employeeObj.profession;
    }
    localStorage.setItem('angular17crud', JSON.stringify(employeeList));
    return employeeList;
  }

  saveEmployee(employeeList: Employee[], employeeObj: Employee): Employee[] {
    const isLocalPresent = localStorage.getItem('angular17crud');
    if (isLocalPresent != null) {
      const oldEmployee = JSON.parse(isLocalPresent);
      employeeObj.id = oldEmployee.length + 1;
      oldEmployee.push(employeeObj);
      employeeList = oldEmployee;
      localStorage.setItem('angular17crud', JSON.stringify(oldEmployee));
    } else {
      const newEmployee = [];
      newEmployee.push(employeeObj);
      employeeObj.id = 1;
      employeeList = newEmployee;
      localStorage.setItem('angular17crud', JSON.stringify(newEmployee));
    }
    return employeeList;
  }
}
