import { map, Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RawDataCollectionResponse } from '../dto/rawDataCollectionResponse';
import { WranglingDataResponse } from '../dto/wranglingDataResponse';
import { DataPruningRequest } from '../dto/dataPruningRequest';
import { HttpClient } from '@angular/common/http';
import { DataPruningResponse } from '../dto/dataPruningResponse';
import { SurvivalModalResponse } from '../dto/survivalModalResponse';
import { SurvivalModalBeforeResponse } from '../dto/survivalModalBeforeResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  webUrl: string = 'http://localhost:8000/api';
  constructor(private http: HttpClient) {}
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  get JwtToken() {
    return localStorage.getItem('token') ?? '';
  }

  isLandingPage() {
    const path = window.location.pathname;
    if (path === '' || path === '/' || path === '/landing') {
      return false;
    }
    return true;
  }

  getRawDataCollection(): Observable<RawDataCollectionResponse[]> {
    let uri = `${this.webUrl}/data_collection`;
    return this.http
      .get<RawDataCollectionResponse[]>(uri)
      .pipe(map((data) => <RawDataCollectionResponse[]>data));
  }

  getWranglingDataCollection(): Observable<WranglingDataResponse> {
    let uri = `${this.webUrl}/data_wrangling`;
    return this.http
      .get<WranglingDataResponse>(uri)
      .pipe(map((data) => <WranglingDataResponse>data));
  }

  sendFilterRequest(
    filter: DataPruningRequest
  ): Observable<DataPruningResponse[]> {
    let uri = `${this.webUrl}/data_pruning`;
    return this.http.post<DataPruningResponse[]>(uri, filter);
  }

  getSurvivalDataBeforeCollection(): Observable<SurvivalModalBeforeResponse> {
    let uri = `${this.webUrl}/survival_model_top_half`;
    return this.http
      .get<SurvivalModalBeforeResponse>(uri)
      .pipe(map((data) => <SurvivalModalBeforeResponse>data));
  }

  getSurvivalDataAfterCollection(): Observable<SurvivalModalResponse> {
    let uri = `${this.webUrl}/survival_model_bottom_half`;
    return this.http
      .get<SurvivalModalResponse>(uri)
      .pipe(map((data) => <SurvivalModalResponse>data));
  }
}
