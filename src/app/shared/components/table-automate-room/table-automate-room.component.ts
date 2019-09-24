import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {AutomateDetail} from '../../models/automate';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-table-automate-room',
  templateUrl: './table-automate-room.component.html',
  styleUrls: ['./table-automate-room.component.scss']
})
export class TableAutomateRoomComponent implements OnInit {
  displayedColumns: string[] = ['name', 'value'];
  dataSource = new MatTableDataSource();
  isOpen = true;

  @Input() automateDetail: AutomateDetail;

  constructor() { }
  ngOnInit() {
    this.dataSource.data = this.automateDetail.sensorsData;
  }
}
