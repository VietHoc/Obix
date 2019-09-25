import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errorMessages'
})
export class ErrorMessagesPipe implements PipeTransform {

  label: string;
  transform(value: Object, label: string): Array<string> {
    this.label = label;
    if (Array.isArray(value)) {
      return value;
    }
    return this.parseErrorObject(value);
  }

  private parseErrorObject(value: Object): string[] {
    let errors = [];
    for (const key in value) {
      if (this.knownErrors()[key]) {
        const errorMessages = this.knownErrors()[key].call(this, value[key]);
        errors = errors.concat(errorMessages);
      }
    }
    return errors;
  }

  private knownErrors(): Object {
    return {
      required: this.requiredError,
      ip: this.ipError,
      autocomplete: this.autocomplete,
      email: this.emailError,
      maxlength: this.maxLength,
      number: this.isNumber,
      matDatepickerParse: this.dateTimeError,
      multipleEmail: this.emailError
    };
  }

  private dateTimeError(_error): string {
    return this.formatErrorMessage('is invalid.');
  }

  private requiredError(_error): string {
    return this.formatErrorMessage('is required.');
  }

  private ipError(_error): string {
    return this.formatErrorMessage('is wrong format.');
  }

  private emailError(_error): string {
    return this.formatErrorMessage('is invalid.');
  }

  private maxLength(error): string {
    return this.formatErrorMessage(`exceed ${error.requiredLength} characters.`);
  }

  private isNumber(_error): string {
    return this.formatErrorMessage(`must be a number.`);
  }

  private autocomplete(_error): string {
    return this.formatErrorMessage(`is invalid.`);
  }

  private formatErrorMessage(message: string): string {
    return `${this.label || 'This field '} ${message}`;
  }

}
