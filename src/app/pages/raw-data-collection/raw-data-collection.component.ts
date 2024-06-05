import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RawDataCollectionResponse } from 'src/app/dto/rawDataCollectionResponse';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-raw-data-collection',
  templateUrl: './raw-data-collection.component.html',
  styleUrls: ['./raw-data-collection.component.scss'],
})
export class RawDataCollectionComponent {
  displayedColumns2: string[] = [
    'accountId',
    'patientId',
    'shipDate',
    'product',
    'diseaseType',
    'segment',
  ];

  dataSource2: any;
  durationInSeconds = 5;
  loading = false;
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  getRawDataCollection() {
    this.loading = true;
    this.authService.getRawDataCollection().subscribe((resp) => {
      this.loading = false;
      if (resp?.length == 0) {
        this.openSnackBar('No Data Found!');
      } else {
        console.log('get api response', resp);
        this.openSnackBar('Successfully Extracted Data!');
        this.dataSource2 = resp as RawDataCollectionResponse[];
      }
    });
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, 'ok', {
      duration: this.durationInSeconds * 1000,
    });
  }
}
