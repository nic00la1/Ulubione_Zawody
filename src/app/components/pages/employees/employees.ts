import { Observable } from 'rxjs';
import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { Employee } from '../../../shared/models/Employee';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../../services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';
@Component({
  selector: 'our-employees',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employees.html',
  styleUrl: './employees.css'
})
export class OurEmployeesComponent {
  @ViewChild('myModal') modal: ElementRef | undefined;

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
}
