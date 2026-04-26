import { AbstractControl, ValidationErrors } from "@angular/forms";

export function SalaryValidator(control: AbstractControl): ValidationErrors | null{
    const value = control.value;
    const pattern = /^\d+$/;
    if (!pattern.test(value)) return { invalidSalary: true };
    return null;
}