import { Component } from '@angular/core';
import { MessageComponent } from '../../partials/message/message.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [MessageComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {

}
