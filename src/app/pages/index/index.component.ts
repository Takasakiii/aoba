import {Component} from '@angular/core';
import {CardComponent} from '../../components/card/card.component';
import {FaIconComponent, IconDefinition} from '@fortawesome/angular-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import {InputComponent} from "../../components/input/input.component";
import {NostrExtensionService} from "../../services/nostr-extension.service";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {getFormControl} from "../../utils/form-utils";

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
    protected readonly form: FormGroup = new FormGroup({
        privateToken: new FormControl('')
    });

    constructor(private readonly _nostrExtension: NostrExtensionService) {
    }

    protected async handleLoginWithExtension(): Promise<void> {
        this.form.patchValue({privateToken: await this._nostrExtension.getPublicKey()})
    }

    protected readonly getFormControl = getFormControl;
}
