import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { BASE_URL } from '../../../../environments/environment';
import { SeasonsResponse } from '../interfaces/seasons.interface';

@Injectable({
  providedIn: 'root',
})
export class SeasonsService {
  private http = inject(HttpClient);

  getSeasons(): Observable<SeasonsResponse> {
    return this.http
      .get<SeasonsResponse>(`${BASE_URL}/seasons.json?limit=1`)
      .pipe(
        map((response) => Number(response.MRData.total)),
        switchMap((total) => {
          const offset = Math.max(total - 10, 0);
          return this.http.get<SeasonsResponse>(
            `${BASE_URL}/seasons.json?limit=10&offset=${offset}`
          );
        })
      );
  }
}
