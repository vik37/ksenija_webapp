import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function urlCheck(): ValidatorFn{
  return (control: AbstractControl) : ValidationErrors | null =>{
    if(control.value === null || control.value.length === 0){
      return null;
    }
    var valid = control.value.startsWith("http");
    return valid ? null : { 'invalidLink': true};
  }
}

