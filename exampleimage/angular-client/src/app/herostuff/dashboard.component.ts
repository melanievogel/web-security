import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from '../../provider/mate-provider/hero.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpParams, HttpClient } from '@angular/common/http';
import { AppSettings } from 'app/app.settings';
import { DomSanitizer } from '@angular/platform-browser';
import { HeroSearchService } from 'provider/mate-provider/hero-search.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  beverages: any[] = [];
  constructor(
    private router: Router,
    private heroService: HeroService,
    private heroSearchService: HeroSearchService,
    private cookieService: CookieService,
    private http: HttpClient,
    private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    // this.heroService.getHeroes()
    //   .subscribe(heroes => this.heroes = heroes);

    this.heroSearchService.getBeverages()
      .subscribe(beverages => this.beverages = beverages);

    if (!this.cookieService.check('id')) {
      let id: string = ''
      for (let i = 0; i < 40; ++i) {
        id += Math.floor(Math.random() * 10);
      }
      this.cookieService.set('id', id);
    }

    if (!this.cookieService.check('session')) {

      const params = new HttpParams()
        .set('id', this.cookieService.get('id'));
      this.http.get(AppSettings.API_ENDPOINT + '/session', { params }).subscribe((res: any) => {
        this.cookieService.set('session', res.session);
      });
    }
  }

  search(term: string): void {
    // Push a search term into the observable stream.
   
    this.heroSearchService.search(term).subscribe((result => {
      this.beverages = result;
    }));
    
  }

  gotoDetail(hero: Hero): void {
    const link = ['/detail', hero.id];
    this.router.navigate(link);
  }



}
