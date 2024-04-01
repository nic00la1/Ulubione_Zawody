import { Injectable } from '@angular/core';
import { Employee } from '../shared/models/Employee';
import { sample_employees } from '../../data';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

  getAll() : Employee[] {
    let employeeList = localStorage.getItem('angular17crud');
    if (employeeList == null) {
      employeeList = JSON.stringify([sample_employees]);
      localStorage.setItem('angular17crud', employeeList);
    }
    return JSON.parse(employeeList);
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

  updateEmployee(employeeList: Employee[], updatedEmployee: Employee): Employee[] {
    const currentRecord = employeeList.findIndex((x) => x.id === updatedEmployee.id);
    if (currentRecord !== -1) {
      employeeList[currentRecord] = updatedEmployee;
      localStorage.setItem('angular17crud', JSON.stringify(employeeList));
    }
    return employeeList;
  }

  addEmployee(employeeList: Employee[], employeeForm: FormGroup): Employee[] {
    const isLocalPresent = localStorage.getItem('angular17crud');
    const employeeObj = employeeForm.value;
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
