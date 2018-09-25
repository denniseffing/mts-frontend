import { Observable } from 'rxjs/Observable';
import { catchError, shareReplay } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export class LoadingWrapper<T> {
  private readonly _errorLoading$: Subject<HttpErrorResponse> = new Subject<HttpErrorResponse>();
  readonly errorLoading$: Observable<HttpErrorResponse> = this._errorLoading$.pipe(
    shareReplay(1),
  );
  readonly data$: Observable<T>;

  constructor(data: Observable<T>) {
    this.data$ = data.pipe(
      shareReplay(1),
      catchError((error: HttpErrorResponse) => {
        this._errorLoading$.next(error);
        return of<T>();
      }),
    );
  }
}
