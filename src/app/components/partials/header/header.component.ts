import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuIconComponent } from '../menu-icon/menu-icon.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MenuIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() toggle = new EventEmitter<void>();

  onToggle() {
    this.toggle.emit();
  }
}
