import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './herostuff/dashboard.component';
import { HeroesComponent } from './herostuff/heroes.component';
import { HeroDetailComponent } from './herostuff/hero-detail.component';
import { TestComponent } from './messages/messages.component';
import { AppComponent } from './app.component';
import { BugReportComponent } from './bug-report/bug-report.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', redirectTo: '/shopping', pathMatch: 'full' },
  { path: 'shopping', component: DashboardComponent },
  { path: 'offers', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'messages', component: TestComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'logIn', component: TestComponent, resolve: {url: 'externalUrlRedirectSolver'}, 
    data: {externalUrl: '../login.html'}},
  { path: 'bug-report', component: BugReportComponent},
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
