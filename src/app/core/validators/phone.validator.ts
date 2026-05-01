import { AbstractControl, ValidationErrors } from '@angular/forms';

export function PhoneValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  const phoneRegex = /^[6-9]\d{9}$/;

  if (!value) return null;

  return phoneRegex.test(value)
    ? null
    : { invalidPhoneNumber: true };
}