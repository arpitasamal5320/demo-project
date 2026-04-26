import { AbstractControl, ValidationErrors } from "@angular/forms";

export function PhoneValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const pattern = /^[6-9]\d{9}$/;
    if (!pattern.test(value)) return { invalidPhoneNumber: true };
    return null;
}