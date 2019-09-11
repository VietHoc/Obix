import {Component, OnInit, ViewChild} from '@angular/core';
import {AutomateService} from '../../core/http/automate.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AutomateDialogComponent} from './components/automate-dialog/automate-dialog.component';
import {Automate} from '../../shared/models/Automate';
import remove from 'lodash-es/remove';

@Component({
  selector: 'app-automate',
  templateUrl: './automate.component.html',
  styleUrls: ['./automate.component.scss']
})
export class AutomateComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'ip', 'uri', 'active', 'action'];
  dataSource = new MatTableDataSource();
  automates: Automate[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private automateHttp: AutomateService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getListAutomates();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public getListAutomates() {
    this.automateHttp.getListAutomates().subscribe(res => {
      this.automates = res;
      this.setDataTable();
    });
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public openDialogAddServer() {
    const dialogRef = this.dialog.open(AutomateDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addServer(result);
      } else {
        console.log('Cancel');
      }
    });
  }

  private addServer(value: Automate) {
    this.automateHttp.addAutomate(value).subscribe(res => {
        this.automates.push(res);
        this.setDataTable();
    });
  }

  public deleteServer(id: number) {
    this.automateHttp.deleteAutomate(id).subscribe(_ => {
      remove(this.automates, item  => item.id === id);
      this.setDataTable();
    });
  }

  private setDataTable() {
    this.dataSource.data = this.automates;
  }
}
