import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Employee } from '../../../shared/models/Employee';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../services/employee.service';
@Component({
  selector: 'our-employees',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})
export class OurEmployeesComponent implements OnInit {
  @ViewChild('myModal') modal: ElementRef | undefined;
  employeeObj: Employee = new Employee();
  employeeList: Employee[] = [];

  // Validation
  isSubmitted = false;
  employeeService = inject(EmployeeService);

  ngOnInit(): void {
    const employees = localStorage.getItem('employees');
    if (employees) {
      this.employeeList = JSON.parse(employees);
    } 

  }

  openModal() {
    const modal = document.getElementById('myModal');
    if (modal != null) {
      modal.style.display = 'block';
    }
  }

  closeModal() {
    this.employeeObj = new Employee();
    if (this.modal != null) {
      this.modal.nativeElement.style.display = 'none';
    }
  }

  saveEmployee() {
    this.isSubmitted = true;
    
    this.employeeList = this.employeeService.saveEmployee(this.employeeList, this.employeeObj);
    localStorage.setItem('employees', JSON.stringify(this.employeeList));
    this.closeModal();
  }

  onDelete(item: Employee) {
    this.employeeList = this.employeeService.onDelete(this.employeeList, item);
    localStorage.setItem('employees', JSON.stringify(this.employeeList));
  }

  onEdit(item: Employee) {
    this.employeeObj = this.employeeService.onEdit(item);
    this.openModal();
  }
  
  updateEmployee() {
    this.employeeList = this.employeeService.updateEmployee(this.employeeList, this.employeeObj);
    this.closeModal();
  }
}