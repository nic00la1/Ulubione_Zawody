import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { LoaderComponent } from '../../../utility/loader/loader.component';
import { SnackbarComponent } from '../../../utility/snackbar/snackbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, LoaderComponent, SnackbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authService = inject(AuthService);
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onFormSubmitted(form: NgForm) {
    // Login logic
    const email = form.value.email;
    const password = form.value.password;
    if (this.isLoginMode) {
      return;
    } else {
      // Sign Up logic
      this.isLoading = true;
      this.authService.signUp(email, password).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = false;
        },
        error: (errMsg) => {
          this.isLoading = false;

          this.errorMessage = errMsg;
          this.hideSnackbar();
        },
      });
    }
    form.reset();
  }

  hideSnackbar() {
    setTimeout(() => {
      this.errorMessage = null;
    }, 3000);
  }
}
