import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent implements OnInit {
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() control: FormControl;

  constructor() { }

  ngOnInit() {
  }

}
