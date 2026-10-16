import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

/** Turns HTTP errors into messages that help students find out what is wrong with their API. */
export const errorInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(
    catchError((err: HttpErrorResponse) => throwError(() => new Error(describe(req.method, req.url, err)))),
  );

function describe(method: string, url: string, err: HttpErrorResponse): string {
  if (err.status === 0) return 'Cannot reach the server. Is the application running?';
  const body = err.error;
  let detail: string | undefined;
  if (typeof body === 'string') {
    try {
      const json = JSON.parse(body);
      detail = json.message || json.detail || json.error;
    } catch {
      detail = body;
    }
  } else if (body && typeof body === 'object') {
    detail = body.message || body.detail || body.error;
  }
  if (err.status === 404 && (!detail || detail === 'Not Found')) {
    return `${method} ${url} returned 404: this endpoint does not exist (yet) in your API.`;
  }
  return `${err.status}: ${detail || 'request failed'}`;
}
