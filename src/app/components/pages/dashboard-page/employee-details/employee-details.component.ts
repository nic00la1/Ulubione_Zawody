import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../../../../shared/models/Employee';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'employee-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent {
  @Output()
  CloseInfoView: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() currentEmployee: Employee | null = null;

  onCloseInfoView(event: Event) {
    event.preventDefault(); // Preventing from bug with rendering to 'home'
    this.CloseInfoView.emit(false);
  }
}
