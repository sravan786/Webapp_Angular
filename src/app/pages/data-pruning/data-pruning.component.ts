import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataPruningRequest } from 'src/app/dto/dataPruningRequest';
import { DataPruningResponse } from 'src/app/dto/dataPruningResponse';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-data-pruning',
  templateUrl: './data-pruning.component.html',
  styleUrls: ['./data-pruning.component.scss'],
})
export class DataPruningComponent {
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
  selectedDate: Date;
  minDate: Date;
  maxDate: Date;
  response: DataPruningResponse[] | null = null;
  diseaseOptions: string[] = ['PAH', 'ILD', 'UNKNOWN'];
  selectedDiseases: string[] = [];
  productOptions: string[] = ['REMODULIN', 'TYVASO', 'ORENITRAM'];
  selectedProduct: string[] = [];
  segmentOptions: string[] = [
    'SUPPORTER',
    'DABBLER',
    'NON SEGMENTED',
    'NAIVE',
    'DOUBTER',
  ];
  selectedSegment: string[] = [];
  constructor(private authService: AuthService, private snackBar: MatSnackBar) {
    this.selectedDate = new Date();
    this.minDate = new Date(2018, 0, 1);
    this.maxDate = new Date();
  }

  postFilterData() {
    this.loading = true;
    const filter: DataPruningRequest = {
      date_filter: this.formatDate(),
      disease_filter: this.selectedDiseases,
      product_filter: this.selectedProduct,
      segment_filter: this.selectedSegment,
    };
    this.authService.sendFilterRequest(filter).subscribe((resp) => {
      this.loading = false;
      if (resp?.length == 0) {
        this.openSnackBar('No Data Found!');
      } else {
        console.log('get api response', resp);
        this.openSnackBar('Successfully Filtered Data!');
        this.dataSource2 = resp as DataPruningResponse[];
      }
    });
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, 'ok', {
      duration: this.durationInSeconds * 1000,
    });
  }

  formatDate() {
    const year = this.selectedDate.getFullYear();
    const month = ('0' + (this.selectedDate.getMonth() + 1)).slice(-2); // Add leading zero
    const day = ('0' + this.selectedDate.getDate()).slice(-2); // Add leading zero
    return `${year}-${month}-${day}`;
  }

  addDisease(event: any) {
    const value = event.value;
    if (value && !this.selectedDiseases.includes(value)) {
      this.selectedDiseases.push(value);
    }
    event.source.value = '';
  }

  removeDisease(disease: string) {
    const index = this.selectedDiseases.indexOf(disease);
    if (index >= 0) {
      this.selectedDiseases.splice(index, 1);
    }
  }

  addProduct(event: any) {
    const value = event.value;
    if (value && !this.selectedProduct.includes(value)) {
      this.selectedProduct.push(value);
    }
    event.source.value = '';
  }

  removeProduct(disease: string) {
    const index = this.selectedProduct.indexOf(disease);
    if (index >= 0) {
      this.selectedProduct.splice(index, 1);
    }
  }

  addSegment(event: any) {
    const value = event.value;
    if (value && !this.selectedSegment.includes(value)) {
      this.selectedSegment.push(value);
    }
    event.source.value = '';
  }

  removeSegment(disease: string) {
    const index = this.selectedSegment.indexOf(disease);
    if (index >= 0) {
      this.selectedSegment.splice(index, 1);
    }
  }
}
