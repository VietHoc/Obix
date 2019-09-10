import {Component, OnInit, ViewChild} from '@angular/core';
import {AutomateService} from '../../core/http/automate.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-automate',
  templateUrl: './automate.component.html',
  styleUrls: ['./automate.component.scss']
})
export class AutomateComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'ip', 'uri', 'active'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private automateHttp: AutomateService
  ) { }

  ngOnInit() {
    this.getListAutomates();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public getListAutomates() {
    this.automateHttp.getListAutomates().subscribe(res => {
      this.dataSource.data = res;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
