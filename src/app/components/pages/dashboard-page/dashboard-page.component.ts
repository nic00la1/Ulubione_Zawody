import { Component, inject } from '@angular/core';
import { MessageComponent } from '../../partials/message/message.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [MessageComponent, FormsModule, CommonModule],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {
  

 
}
