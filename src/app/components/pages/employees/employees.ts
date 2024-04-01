import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Employee } from '../../../shared/models/Employee';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../services/employee.service';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
@Component({
  selector: 'our-employees',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextInputComponent],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})
export class OurEmployeesComponent implements OnInit {
  employeeObj: Employee = new Employee();
  employeeList: Employee[] = [];

  employeeForm !: FormGroup;
  isSubmitted = false;

  formBuilder = inject(FormBuilder);
  employeeService = inject(EmployeeService);
  @ViewChild('myModal') modal: ElementRef | undefined;

  ngOnInit(): void {
    this.displayEmployees();

    this.employeeForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      profession: new FormControl('', [Validators.required]),
    });
  }


  get fc() {
    return this.employeeForm.controls;
  }

  displayEmployees() {
    this.employeeList = this.employeeService.getAll();
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
    this.employeeList = this.employeeService.saveEmployee(this.employeeList, this.employeeForm);
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
    this.employeeList = this.employeeService.updateEmployee(this.employeeList, this.employeeForm);
    this.closeModal();
  }
  
}