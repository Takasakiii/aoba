import {Component, Input, TemplateRef} from '@angular/core';
import {NgIf, NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'app-toolsbar',
  standalone: true,
  imports: [
    NgIf,
    NgTemplateOutlet
  ],
  templateUrl: './toolsbar.component.html',
})
export class ToolsbarComponent {
  @Input() public startBar: TemplateRef<void> | null = null;
  @Input() public middleBar: TemplateRef<void> | null = null;
  @Input() public endBar: TemplateRef<void> | null = null;
}
