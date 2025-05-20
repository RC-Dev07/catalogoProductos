import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchTerm = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTerm.asObservable().pipe(
      debounceTime(1000),
      distinctUntilChanged()
    );
  setSearchTerm(term: string) {
    this.searchTerm.next(term);
  }
}
