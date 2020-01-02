import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map
} from 'rxjs/operators';
import { Hero } from './hero';
import { HeroSearchService } from '../../provider/mate-provider/hero-search.service';
import { DomSanitizer } from '@angular/platform-browser';
import { b } from '@angular/core/src/render3';
import { serializePath } from '@angular/router/src/url_tree';

@Component({
  selector: 'my-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
  providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {
  heroes: Observable<Hero[]>;
  exists: Boolean = false;
  beverages: Hero[] = [];
  private searchTerms = new Subject<string>();

  constructor(
    private heroSearchService: HeroSearchService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  checkIfExistsInDb(term: string): Boolean{
    this.beverages.forEach(element => {
      if(element.name == term){
        this.exists = true;
      }    
    });
    return this.exists;
  }
  
  search(term: string): void {
    // Push a search term into the observable stream.
    this.sanitizer.bypassSecurityTrustScript(term)
    this.searchTerms.next(term);
    this.checkIfExistsInDb(term)
  }

  ngOnInit(): void {
    this.heroSearchService.getBeverages()
    .subscribe(beverages => this.beverages = beverages);

    this.heroes = this.searchTerms.pipe(
      debounceTime(300), // wait for 300ms pause in events
      distinctUntilChanged(), // ignore if next search term is same as previous
      switchMap(
        term =>
          term // switch to new observable each time
            ? // return the http search observable
              this.heroSearchService.search(term)
            : // or the observable of empty heroes if no search term
              of<Hero[]>([])
      ),
      catchError(error => {
        // TODO: real error handling
        console.log(`Error in component ... ${error}`);
        return of<Hero[]>([]);
      })
    );
  }

  gotoDetail(hero: Hero): void {
    const link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
