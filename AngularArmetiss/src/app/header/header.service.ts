import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private searchDataSubject = new Subject<any>();
  public searchData$: Observable<any> = this.searchDataSubject.asObservable();

  public addData(data: any): void {
    this.searchDataSubject.next(data);
  }

  constructor() { }
}
