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
  private userSubject ?: Subscription

  ngOnInit() {
    this.userSubject = this.authService.user.subscribe((user: User) => {
      this.isLoggedIn = user ? true : false;
    });
  }

  ngOnDestroy() {
    this.userSubject?.unsubscribe();
  }
  onToggle() {
    this.toggle.emit();
  }
}
