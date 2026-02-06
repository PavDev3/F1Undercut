import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  of,
  throwError,
  timer,
} from 'rxjs';
import { finalize, mergeMap, retryWhen, shareReplay, tap } from 'rxjs/operators';
import { BASE_URL } from '../../../../environments/environment';

const CACHE_TTL_MS = 5 * 60 * 1000;
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000;
const JITTER_MS = 250;

type CacheEntry = {
  expiry: number;
  response: HttpResponse<unknown>;
};

@Injectable()
export class HttpCacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, CacheEntry>();
  private inFlight = new Map<string, Observable<HttpEvent<unknown>>>();

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.isCacheable(req)) {
      return this.withRetry(next.handle(req));
    }

    const cacheKey = req.urlWithParams;
    const cached = this.cache.get(cacheKey);
    const now = Date.now();
    if (cached && cached.expiry > now) {
      return of(cached.response.clone());
    }

    const inFlight = this.inFlight.get(cacheKey);
    if (inFlight) {
      return inFlight;
    }

    const request$ = this.withRetry(next.handle(req)).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.cache.set(cacheKey, {
            expiry: Date.now() + CACHE_TTL_MS,
            response: event,
          });
        }
      }),
      finalize(() => this.inFlight.delete(cacheKey)),
      shareReplay(1)
    );

    this.inFlight.set(cacheKey, request$);
    return request$;
  }

  private isCacheable(req: HttpRequest<unknown>): boolean {
    return req.method === 'GET' && req.urlWithParams.startsWith(BASE_URL);
  }

  private withRetry(source$: Observable<HttpEvent<unknown>>): Observable<HttpEvent<unknown>> {
    return source$.pipe(
      retryWhen((errors) =>
        errors.pipe(
          mergeMap((err, index) => {
            const attempt = index + 1;
            if (!this.isRateLimitError(err) || attempt > MAX_RETRIES) {
              return throwError(() => err);
            }
            const delayMs = this.getRetryDelayMs(err, attempt);
            return timer(delayMs);
          })
        )
      )
    );
  }

  private isRateLimitError(err: unknown): err is HttpErrorResponse {
    return err instanceof HttpErrorResponse && err.status === 429;
  }

  private getRetryDelayMs(err: HttpErrorResponse, attempt: number): number {
    const header = err.headers?.get('Retry-After');
    if (header) {
      const seconds = Number(header);
      if (Number.isFinite(seconds)) {
        return Math.max(0, seconds * 1000);
      }
      const dateMs = Date.parse(header);
      if (!Number.isNaN(dateMs)) {
        return Math.max(0, dateMs - Date.now());
      }
    }

    const jitter = Math.floor(Math.random() * JITTER_MS);
    return BASE_DELAY_MS * Math.pow(2, attempt - 1) + jitter;
  }
}
