import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule, InMemoryDbService } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeroService } from '../provider/mate-provider/hero.service';
import { DashboardComponent } from './herostuff/dashboard.component';
import { HeroesComponent } from './herostuff/heroes.component';
import { HeroDetailComponent } from './herostuff/hero-detail.component';
import { HeroSearchComponent } from './herostuff/hero-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TestComponent } from './messages/messages.component';
import { ImportMaterialModule } from './import-material.module';
import { MessageService } from 'provider/message-provider/message.service';
import { FlagDialog } from './flags/flag.dialogue';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BugReportComponent } from './bug-report/bug-report.component';

import { CookieService } from 'ngx-cookie-service';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { MateService } from 'provider/mate-provider/mate.service';
import { HeroSearchService } from 'provider/mate-provider/hero-search.service';
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ImportMaterialModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
      delay: 300,
      passThruUnknownUrl: true
    })
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroSearchComponent,
    HeroesComponent,
    HeroDetailComponent,
    TestComponent,
    FlagDialog,
    BugReportComponent,
    ProfileComponent,
    LoginComponent
  ],
  providers: [HeroService, HeroSearchService, CookieService ,MessageService, MateService
    ,
    { provide:'externalUrlRedirectSolver',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        window.location.href = (route.data as any).externalUrl;
      }
    }
],
  entryComponents: [FlagDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
