import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { Employee } from '../../../../shared/models/Employee';
import {
  FormsModule, NgForm,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '../../../partials/text-input/text-input.component';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'our-employees',
  standalone: true,
  imports: [CommonModule, FormsModule, TextInputComponent],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})
export class OurEmployeesComponent {
  @ViewChild('myModal') modal: ElementRef | undefined;
  employeeObj: Employee = new Employee();
  employeeList: Employee[] = [];

  @Output()
  EmitTaskdata: EventEmitter<Employee> = new EventEmitter<Employee>();


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

  addEmployee(form: NgForm) {
    this.EmitTaskdata.emit(form.value);
    console.log(form.value)
    this.closeModal();
  }

 

}