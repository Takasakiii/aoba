import { Component } from '@angular/core';
import {ToolsbarComponent} from "../../components/toolsbar/toolsbar.component";
import {IconButtonComponent} from "../../components/icon-button/icon-button.component";
import {IconDefinition} from "@fortawesome/angular-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ToolsbarComponent,
    IconButtonComponent,
    NgOptimizedImage
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  protected readonly faPlus: IconDefinition = faPlus;
  protected imagesUrl: string[] = [];

  protected handleOnFileSelected(e: Event): void {
    const fileInput = e.target as HTMLInputElement
    const files = fileInput.files;

    if(!files)
      return;

    for(let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if(!file)
        continue;
      const url = URL.createObjectURL(file);
      this.imagesUrl.push(url)
    }
  }
}
