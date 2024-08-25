import {Component, OnInit} from '@angular/core';
import {ToolsbarComponent} from "../../components/toolsbar/toolsbar.component";
import {IconButtonComponent} from "../../components/icon-button/icon-button.component";
import {IconDefinition} from "@fortawesome/angular-fontawesome";
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {NgOptimizedImage} from "@angular/common";
import {FileService} from "../../services/file.service";

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
export class DashboardComponent implements OnInit {
  protected readonly faPlus: IconDefinition = faPlus;
  protected imagesUrl: string[] = [];

  constructor(private readonly _fileService: FileService) {
  }

  async ngOnInit(): Promise<void> {
    const files = await this._fileService.getFiles();
    this.imagesUrl = files.map(x => URL.createObjectURL(x));
  }

  protected async handleOnFileSelected(e: Event): Promise<void> {
    const fileInput = e.target as HTMLInputElement
    const files = fileInput.files;

    if (!files)
      return;

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (!file)
        continue;
      const url = URL.createObjectURL(file);
      await this._fileService.addFile(file);
      this.imagesUrl.push(url);
    }
  }
}
