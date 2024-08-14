import {Component} from '@angular/core';
import {CardComponent} from '../../components/card/card.component';
import {FaIconComponent, IconDefinition} from '@fortawesome/angular-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import {InputComponent} from "../../components/input/input.component";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {getFormControl} from "../../utils/form-utils";
import {NostrService} from "../../services/nostr.service";

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    CardComponent,
    FaIconComponent,
    InputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  protected readonly faUser: IconDefinition = faUser;
  protected readonly getFormControl = getFormControl;

  protected readonly form: FormGroup = new FormGroup({
    privateToken: new FormControl('')
  });

  constructor(private readonly _nostr: NostrService) {}

  protected async handleLoginWithExtension(): Promise<void> {
    await this._nostr.login()
  }

  protected async handleSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    const {privateToken} = this.form.value;
    await this._nostr.login(privateToken);
  }
}
