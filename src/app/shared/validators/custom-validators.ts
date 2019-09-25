import { ValidationErrors, AbstractControl } from '@angular/forms';

export class CustomValidators {
  private static regexEmail = /^[\w!#$%&'*+-/=?^_`{|}~()]+@[\w!#$%&'*+-/=?^_`{|}~()]+(\.[\w!#$%&'*+-/=?^_`{|}~()]+)+$/;
  private static regexIp = /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/;


  static email(control: AbstractControl): ValidationErrors | null {
    const email = control.value as string;
    if (!!email && !CustomValidators.regexEmail.test(email)) {
        return { email: true };
      }
    return null;
  }

  static ip(control: AbstractControl): ValidationErrors | null {
    const ip = control.value as string;
    if (!!ip && !CustomValidators.regexIp.test(ip)) {
        return { ip: true };
    }
    return null;
  }
}

