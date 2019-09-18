import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {AutomateDetail} from '../../models/automate';

@Component({
  selector: 'app-table-automate-room',
  templateUrl: './table-automate-room.component.html',
  styleUrls: ['./table-automate-room.component.scss']
})
export class TableAutomateRoomComponent implements OnInit {
  displayedColumns: string[] = ['index', 'name', 'value'];
  dataSource = new MatTableDataSource();

  @Input() automateDetail: AutomateDetail;

  constructor() { }
  ngOnInit() {
    this.dataSource.data = this.automateDetail.sensorsData;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
