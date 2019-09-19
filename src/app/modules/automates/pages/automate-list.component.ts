import {Component, OnInit, ViewChild} from '@angular/core';
import {AutomateService} from '../../../core/http/automate.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AutomateDialogComponent} from '../components/automate-dialog/automate-dialog.component';
import {Automate} from '../../../shared/models/automate';
import {remove, assign} from 'lodash-es';
import {ConfirmationDialog} from '../../../core/service/confirmation-dialog';
import {DIALOG} from '../../../constant/string';
import {STYLE} from '../../../constant/style';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-automate',
  templateUrl: './automate-list.component.html',
  styleUrls: ['./automate-list.component.scss']
})
export class AutomateListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'ip', 'uri', 'floor', 'active', 'action'];
  dataSource = new MatTableDataSource();
  automates: Automate[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private automateHttp: AutomateService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
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
    const automate = new Automate();
    automate.active = true;
    const dialogRef = this.dialog.open(AutomateDialogComponent, {
      width: '500px',
      data: automate
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

  public deleteServer(automate: Automate) {
    ConfirmationDialog.show(this.dialog, `${DIALOG.MESSAGE_DELETE} ${automate.name}?` , DIALOG.TITLE_DELETE_SENSOR)
      .subscribe(result => {
        if (result) {
          this.automateHttp.deleteAutomate(automate.id).subscribe(_ => {
            remove(this.automates, item  => item.id === automate.id);
            this.setDataTable();
          });
        }
      });
  }

  private setDataTable() {
    this.dataSource.data = this.automates;
  }

  public openDialogUpdateServer(automate: Automate) {
    const dialogRef = this.dialog.open(AutomateDialogComponent, {
      width: STYLE.WIDTH_DIALOG_UPDATE,
      data: automate
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateServer(automate.id, result);
      } else {
        console.log('Cancel');
      }
    });
  }

  private updateServer(id: number, automate: Automate) {
      this.automateHttp.updateAutomate(id, automate).subscribe(res => {
        assign(this.automates.find(item => item.id === id), res);
        this.setDataTable();
      });
  }

  public redirectToDetailAutomate(automate: Automate) {
    this.router.navigate([`${automate.id}/sensors`], {relativeTo: this.route, queryParams: {automateName: automate.name}}).then(_ => {});
  }
}
