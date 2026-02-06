import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { OpenF1Driver, OpenF1Meeting } from '../interfaces/openf1.interface';

@Injectable({
  providedIn: 'root',
})
export class OpenF1Service {
  private http = inject(HttpClient);
  private baseUrl = 'https://api.openf1.org/v1';

  getLatestDrivers(): Observable<OpenF1Driver[]> {
    return this.http.get<OpenF1Driver[]>(`${this.baseUrl}/drivers?meeting_key=latest`);
  }

  getMeetingsByYear(year: string | number): Observable<OpenF1Meeting[]> {
    return this.http.get<OpenF1Meeting[]>(`${this.baseUrl}/meetings?year=${year}`);
  }
}
