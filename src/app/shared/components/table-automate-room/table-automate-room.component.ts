import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {AutomateDetail} from '../../models/automate';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-table-automate-room',
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        opacity: 10,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        opacity: 1,
        backgroundColor: 'green'
      })),
      transition('* => closed', [
        animate('2s')
      ]),
      transition('* => open', [
        animate('1s')
      ]),
    ]),
  ],
  templateUrl: './table-automate-room.component.html',
  styleUrls: ['./table-automate-room.component.scss']
})
export class TableAutomateRoomComponent implements OnInit {
  displayedColumns: string[] = ['index', 'name', 'value'];
  dataSource = new MatTableDataSource();
  isOpen = true;

  @Input() automateDetail: AutomateDetail;

  constructor() { }
  ngOnInit() {
    this.dataSource.data = this.automateDetail.sensorsData;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toggle() {
    this.isOpen = !this.isOpen;
    console.log(this.isOpen);
  }
}
