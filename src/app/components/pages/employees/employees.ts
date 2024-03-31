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
  newEmployeeForm !: FormGroup;
  isSubmitted = false;
  formBuilder = inject(FormBuilder);
  employeeService = inject(EmployeeService);

  ngOnInit(): void {
    this.employeeList = this.employeeService.getAll();

    // Validation
    this.newEmployeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      profession: ['', Validators.required],
    });
  }

  get fc() {
    return this.newEmployeeForm.controls;
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
    if (this.newEmployeeForm.invalid) {
      return;
    }
    this.employeeList = this.employeeService.saveEmployee(this.employeeList, this.employeeObj);
    this.closeModal();
  }

  onDelete(item: Employee) {
    this.employeeList = this.employeeService.onDelete(this.employeeList, item);
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