import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
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
  @Input() isEditMode : boolean = false;

  @Input() selectedEmployee !: Employee 

  @ViewChild('employeeForm') employeeForm !: NgForm

  @Output()
  CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  EmitTaskData: EventEmitter<Employee> = new EventEmitter<Employee>();


  ngAfterViewInit() {
    setTimeout(() => {
      this.employeeForm.form.patchValue(this.selectedEmployee);
    }, 0);
  }

  OnCloseForm(){
    this.CloseForm.emit(false);
  }

  OnFormSubmitted(form: NgForm) {
    this.EmitTaskData.emit(form.value);
    this.CloseForm.emit(false);
  }
}