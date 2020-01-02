import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Hero } from '../../app/herostuff/hero';
import { AppSettings } from 'app/app.settings';

@Injectable()
export class HeroSearchService {
  constructor(private http: HttpClient) {}

  search(term: string): Observable<any[]> {
    return this.http
      .get<any[]>(AppSettings.API_ENDPOINT + '/searchbeverage', {
        params: {q: term}
      })
      .pipe(catchError(this.handleError));
  }

  getBeverages() {
    return this.http.get<any[]>(AppSettings.API_ENDPOINT + '/shopping')
      .pipe(map(data => data), catchError(this.handleError))
  }


  private handleError(res: HttpErrorResponse) {
    console.error(res.error);
    return observableThrowError(res.error || 'Server error');
  }
}
