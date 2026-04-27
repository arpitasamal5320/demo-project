<<<<<<< HEAD
import { AbstractControl, ValidationErrors } from "@angular/forms";

export function PhoneValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const pattern = /^[6-9]\d{9}$/;
    if (!pattern.test(value)) return { invalidPhoneNumber: true };
    return null;
=======
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function PhoneValidator(control: AbstractControl): ValidationErrors | null {

  const value = control.value;

  const isValid = /^[6-9]\d{9}$/.test(value);

  return isValid ? null : { invalidPhoneNumber: true };
>>>>>>> fbcfefc (API + dashboard feature changes)
}