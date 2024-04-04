import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'menu-icon',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu-icon.component.html',
  styleUrl: './menu-icon.component.css'
})
export class MenuIconComponent {
  @Output() toggle = new EventEmitter<void>();

  onIconClick() {
    this.toggle.emit();
  }
}
