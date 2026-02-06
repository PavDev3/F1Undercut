import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { WikiSummary } from '../interfaces/wiki-summary.interface';

interface WikiSearchResponse {
  pages?: Array<{
    title?: string;
  }>;
}

@Injectable({
  providedIn: 'root',
})
export class WikiSummaryService {
  private http = inject(HttpClient);

  getSummaryByUrl(
    url: string,
    lang: 'es' | 'en' = 'es'
  ): Observable<WikiSummary | null> {
    const title = this.extractTitleFromUrl(url);
    if (!title) {
      return of(null);
    }
    return this.getSummaryByTitle(title, lang);
  }

  getSummaryByTitle(
    title: string,
    lang: 'es' | 'en' = 'es'
  ): Observable<WikiSummary | null> {
    const safeTitle = encodeURIComponent(title);
    const endpoint = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${safeTitle}`;
    return this.http.get<WikiSummary>(endpoint).pipe(
      catchError(() => of(null)),
      switchMap((summary) => {
        if (summary || lang === 'en') {
          return of(summary);
        }
        return this.getSummaryByTitle(title, 'en');
      })
    );
  }

  getSummaryBySearch(
    query: string,
    lang: 'es' | 'en' = 'es'
  ): Observable<WikiSummary | null> {
    const safeQuery = encodeURIComponent(query);
    const endpoint = `https://${lang}.wikipedia.org/w/rest.php/v1/search/page?q=${safeQuery}&limit=1`;
    return this.http.get<WikiSearchResponse>(endpoint).pipe(
      catchError(() => of(null)),
      switchMap((result) => {
        const title = result?.pages?.[0]?.title;
        if (title) {
          return this.getSummaryByTitle(title, lang);
        }
        if (lang === 'en') {
          return of(null);
        }
        return this.getSummaryBySearch(query, 'en');
      })
    );
  }

  private extractTitleFromUrl(url: string) {
    try {
      const parsed = new URL(url);
      const segments = parsed.pathname.split('/');
      const last = segments.filter(Boolean).pop();
      return last ? decodeURIComponent(last.replaceAll('_', ' ')) : '';
    } catch {
      return '';
    }
  }
}
