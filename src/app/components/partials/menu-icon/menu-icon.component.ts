import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../shared/models/User';

@Component({
  selector: 'menu-icon',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu-icon.component.html',
  styleUrl: './menu-icon.component.css'
})
export class MenuIconComponent {
  @Output() toggle = new EventEmitter<void>();

  authService = inject(AuthService);
  isLoggedIn : boolean = false;

  ngOnInit() {
    this.authService.user.subscribe((user: User) => {
      this.isLoggedIn = user ? true : false;
    });
  }

  onIconClick() {
    this.toggle.emit();
  }
}
