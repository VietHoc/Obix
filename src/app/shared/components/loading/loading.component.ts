import { Component, OnInit, Input } from '@angular/core';

export enum loadingMode {
  FULL = 'full',
  NORMAL = 'normal',
  SMALL = 'small'
}

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @Input() mode = loadingMode.NORMAL;
  constructor() { }

  ngOnInit() {
  }

}
