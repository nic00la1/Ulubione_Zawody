import { Component, OnInit, inject } from '@angular/core';
import { MessageComponent } from '../../partials/message/message.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../../shared/models/Employee';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subscription, map } from 'rxjs';
import { OurEmployeesComponent } from './employees/employees';
import { EmployeeService } from '../../../services/employee.service';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    MessageComponent,
    FormsModule,
    CommonModule,
    OurEmployeesComponent,
    EmployeeDetailsComponent,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css',
})
export class DashboardPageComponent implements OnInit {
  showCreateEmployeeForm: boolean = false;
  showEmployeeDetails: boolean = false;
  http = inject(HttpClient);
  allEmployees: Employee[] = [];
  employeeService = inject(EmployeeService);
  currentEmployeeId: string = '';
  isLoading: boolean = false;

  currentEmployee: Employee | null = null;

  errorMessage: string | null = null;

  editMode: boolean = false;
  selectedEmployee!: Employee;

  errorSub!: Subscription;

  ngOnInit() {
    this.fetchAllEmployees();
    this.errorSub = this.employeeService.errorSubject.subscribe({
      next: (httpError) => {
        this.setErrorMessage(httpError);
      },
    });
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe(); // Good practice to unsubscribe from the errorSubject
  }

  OpenCreateEmployeeForm() {
    this.showCreateEmployeeForm = true;
    this.editMode = false;
    this.selectedEmployee = {
      name: '',
      surname: '',
      email: '',
      password: '',
      profession: '',
      salary: 0,
      startDate: '',
      isFullTime: false,
    };
  }

  showCurrentEmployeeDetails(id: string | undefined) {
    this.showEmployeeDetails = true;
    this.employeeService.getEmployeeInfo(id).subscribe({
      next: (data: any) => {
        this.currentEmployee = data as Employee;
      },
    });
  }
  CloseEmployeeInfo() {
    this.showEmployeeDetails = false;
  }

  CloseCreateEmployeeForm() {
    this.showCreateEmployeeForm = false;
  }

  CreateOrUpdateEmployee(data: Employee) {
    if (!this.editMode) {
      this.employeeService.CreateEmployee(data);
    } else {
      // edit employee
      this.employeeService.UpdateEmployee(this.currentEmployeeId, data);
    }
  }

  FetchAllEmployeeClicked() {
    this.fetchAllEmployees();
  }

  private fetchAllEmployees() {
    this.isLoading = true;
    this.employeeService.GetAllEmployees().subscribe({
      next: (employees) => {
        this.allEmployees = employees;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.setErrorMessage(error);
        this.isLoading = false;
      },
    });
  }

  private setErrorMessage(err: HttpErrorResponse) {
    if (err.error.error === 'Permission denied')
      this.errorMessage = 'Nie masz uprawnień do wykonania tej operacji';
    else this.errorMessage = err.message;
    setTimeout(() => {
      this.errorMessage = null;
    }, 3000);
  }

  DeleteEmployee(id: string | undefined) {
    this.employeeService.DeleteEmployee(id);
  }

  DeleteAllEmployees() {
    this.employeeService.DeleteAllEmployees();
  }

  onEditEmployeeClicked(id: string | undefined) {
    this.currentEmployeeId = id as string;

    // OPEN EDIT EMPLOYEE FORM
    this.showCreateEmployeeForm = true;
    this.editMode = true;

    this.selectedEmployee = this.allEmployees.find((employee) => {
      return employee.id === id;
    }) as Employee;
  }
}
