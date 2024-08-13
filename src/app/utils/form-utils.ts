import {FormControl, FormGroup} from "@angular/forms";

export function getFormControl(formGroup: FormGroup, controlName: string): FormControl {
  return formGroup.controls[controlName] as FormControl;
}
