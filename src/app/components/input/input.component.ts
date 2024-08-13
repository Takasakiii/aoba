import {Component, Input} from '@angular/core';
import {AbstractControl, FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @Input({required: true}) public label!: string;
  @Input() public type: string = 'text';
  @Input() public placeholder: string = '';
  @Input({required: true}) public form!: FormControl;
}
