import { Component, Input } from '@angular/core';
import { InputContainerComponent } from '../input-container/input-container.component';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputValidationComponent } from '../input-validation/input-validation.component';

@Component({
  selector: 'text-input',
  standalone: true,
  imports: [InputContainerComponent, InputValidationComponent,ReactiveFormsModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css'
})
export class TextInputComponent {
  @Input()
  control !: AbstractControl;
  @Input()
  showErrorsWhen :boolean = true;
  @Input()
  label !: string;
  @Input()
  type : 'text' | 'password' | 'email' = 'text';

  get formControl() {
    return this.control as FormControl;
  }
}
