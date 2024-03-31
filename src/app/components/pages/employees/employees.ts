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
  employee: Employee = new Employee();
  employees: Employee[] = [];


  ngOnInit(): void {
    const localData = localStorage.getItem('angular17crud');
    if (localData != null) {
      this.employees = JSON.parse(localData);
    }
  }

 openModal() {
  const modal = document.getElementById('myModal');
  if(modal !=null) {
    modal.style.display = 'block';
  }
 }

 closeModal() {
  if (this.modal != null) {
    this.modal.nativeElement.style.display = 'none';
  }
 }
 
 saveEmployee() {
  const isLocalPresent = localStorage.getItem('angular17crud');
  if (isLocalPresent != null) {
    const oldEmployee = JSON.parse(isLocalPresent);
    oldEmployee.push(this.employee);
    this.employees = oldEmployee;
    localStorage.setItem('angular17crud', JSON.stringify(oldEmployee));
  } else {
    const newEmployee = [];
    newEmployee.push(this.employee);
    this.employees = newEmployee;
    localStorage.setItem('angular17crud', JSON.stringify(newEmployee));

  }
 }
}
