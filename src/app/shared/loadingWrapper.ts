import { Observable } from 'rxjs/Observable';
import { catchError, shareReplay } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs';

export class LoadingWrapper<T> {
  private readonly _errorLoading$: Subject<boolean> = new Subject<boolean>();
  readonly errorLoading$: Observable<boolean> = this._errorLoading$.pipe(
    shareReplay(1),
  );
  readonly data$: Observable<T>;

  constructor(data: Observable<T>) {
    this.data$ = data.pipe(
      shareReplay(1),
      catchError((_: Error) => {
        this._errorLoading$.next(true);
        return of<T>();
      }),
    );
  }
}
