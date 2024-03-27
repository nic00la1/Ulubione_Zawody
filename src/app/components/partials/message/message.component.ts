import { Component, inject } from '@angular/core';
import { MessageService } from '../../../services/message/message.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  messageService = inject(MessageService);
}
