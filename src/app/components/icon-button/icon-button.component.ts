import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FaIconComponent, IconDefinition} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './icon-button.component.html',
})
export class IconButtonComponent {
  @Input({required: true}) public icon!: IconDefinition;
  @Input({required: true}) public label!: string;
  @Input() public type: string = 'button';
  @Output() public onClick: EventEmitter<void> = new EventEmitter();
}
