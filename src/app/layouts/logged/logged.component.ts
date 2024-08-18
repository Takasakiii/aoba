import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {SidebarButtonComponent} from "../../components/sidebar-button/sidebar-button.component";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import {IconDefinition} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-logged',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarButtonComponent
  ],
  templateUrl: './logged.component.html',
  styleUrl: './logged.component.css'
})
export class LoggedComponent {
  protected readonly testIcon: IconDefinition = faUser;
}
