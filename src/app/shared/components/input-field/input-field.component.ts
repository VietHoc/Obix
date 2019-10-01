import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent implements OnInit {
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() control: FormControl;
  @Output() onChanged = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  public dateChange($event): void {
    this.onChanged.emit(this.control.value);
  }

  public get isRequired(): boolean {
    if (this.control && this.control.validator) {
      const validator = this.control.validator({} as AbstractControl);
      return validator && validator.required;
    }
    return false;
  }

  public get isVisibleClearDate(): boolean {
    return !this.isRequired &&
      this.control &&
      !!this.control.value &&
      !this.control.disabled;
  }

  resetInputDate(event: Event): void {
    event.stopPropagation();
    this.control.reset();
  }
}
