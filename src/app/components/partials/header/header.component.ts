import { Component, EventEmitter, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuIconComponent } from '../menu-icon/menu-icon.component';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../shared/models/User';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MenuIconComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy{
  @Output() toggle = new EventEmitter<void>();

  authService = inject(AuthService);
  isLoggedIn: boolean = false;
  user: User | null = null;
  private userSubject ?: Subscription

  ngOnInit() {
    this.userSubject = this.authService.user.subscribe((user: User) => {
      console.log(user);
      this.isLoggedIn = user ? true : false;
      this.user = user;
    });
  }

  onLogout() {
    this.authService.logout();
  }

  onToggle() {
    this.toggle.emit();
  }

  ngOnDestroy() {
    this.userSubject?.unsubscribe();
  }
}
