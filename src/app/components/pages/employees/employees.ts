import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../../../shared/models/Employee';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'our-employees',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employees.html',
  styleUrl: './employees.css'
})
export class OurEmployeesComponent implements OnInit{
  @ViewChild('myModal') modal: ElementRef | undefined;
  employeeObj: Employee = new Employee();
  employeeList: Employee[] = [];


  ngOnInit(): void {
    const localData = localStorage.getItem('angular17crud');
    if (localData != null) {
      this.employeeList = JSON.parse(localData);
    }
  }

 openModal() {
  const modal = document.getElementById('myModal');
  if(modal !=null) {
    modal.style.display = 'block';
  }
 }

 closeModal() {
  this.employeeObj = new Employee();
  if (this.modal != null) {
    this.modal.nativeElement.style.display = 'none';
  }
 }
 
 onEdit(item: Employee) {
    this.employeeObj = item;
    this.openModal();
 }

updateEmployee() {
  const currentRecord = this.employeeList.find(x => x.id === this.employeeObj.id);
  if (currentRecord != undefined) {
    currentRecord.name = this.employeeObj.name;
    currentRecord.surname = this.employeeObj.surname;
    currentRecord.email = this.employeeObj.email;
    currentRecord.proffesion = this.employeeObj.proffesion;
  };
  localStorage.setItem('angular17crud', JSON.stringify(this.employeeList));
  this.closeModal();
}

 saveEmployee() {
  debugger;
  const isLocalPresent = localStorage.getItem('angular17crud');
  if (isLocalPresent != null) {

    const oldEmployee = JSON.parse(isLocalPresent);
    this.employeeObj.id = oldEmployee.length + 1;
    oldEmployee.push(this.employeeObj);
    this.employeeList = oldEmployee;
    localStorage.setItem('angular17crud', JSON.stringify(oldEmployee));
  } else {
    const newEmployee = [];
    newEmployee.push(this.employeeObj);
    this.employeeObj.id = 1;
    this.employeeList = newEmployee;
    localStorage.setItem('angular17crud', JSON.stringify(newEmployee));
  }
  this.closeModal();
 }
}
