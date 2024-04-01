import { Component, OnInit, inject } from '@angular/core';
import { MessageComponent } from '../../partials/message/message.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../../shared/models/Employee';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { OurEmployeesComponent } from './employees/employees';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [MessageComponent, FormsModule, CommonModule, OurEmployeesComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css',
})
export class DashboardPageComponent implements OnInit {
  showCreateEmployeeForm: boolean = false;
  http = inject(HttpClient);
  allEmployees: Employee[] = [];
  employeeService = inject(EmployeeService);

  editMode : boolean = false;
  selectedEmployee !: Employee 

  ngOnInit() {
    this.fetchAllEmployees();
  }

  OpenCreateEmployeeForm() {
    this.showCreateEmployeeForm = true;
    this.editMode = false;
    this.selectedEmployee = {name: '', surname: '', email: '', profession: ''}
  }

  CloseCreateEmployeeForm() {
    this.showCreateEmployeeForm = false;
  }

  CreateEmployee(data: Employee) {
    this.employeeService.CreateEmployee(data);
    this.CloseCreateEmployeeForm();
  }

  private fetchAllEmployees() {
    this.employeeService.GetAllEmployees().subscribe((employees) => {
      this.allEmployees = employees;
    });
  }

  DeleteEmployee(employeeId: string | undefined) {
    this.employeeService.DeleteEmployee(employeeId);
  }

  DeleteAllEmployees() {
   this.employeeService.DeleteAllEmployees();
  }

  onEditEmployeeClicked(id: string | undefined) {
    // OPEN EDIT EMPLOYEE FORM
    this.showCreateEmployeeForm = true;
    this.editMode = true;

    this.selectedEmployee != this.allEmployees.find((employee) => { return employee.id === id; })
  
  }
}
