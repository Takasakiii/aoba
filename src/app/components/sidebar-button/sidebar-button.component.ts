import {Component, Input} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {FaIconComponent, IconDefinition} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-sidebar-button',
  standalone: true,
  imports: [
    RouterLink,
    FaIconComponent,
    RouterLinkActive
  ],
  templateUrl: './sidebar-button.component.html',
  styleUrl: './sidebar-button.component.css'
})
export class SidebarButtonComponent {
  @Input({required: true}) public icon!: IconDefinition;
  @Input({required: true}) public url!: string;
  @Input({required: true}) public label!: string;
}
