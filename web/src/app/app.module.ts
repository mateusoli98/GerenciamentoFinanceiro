import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DrawerComponent } from './components/drawer/drawer.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

import { StoreModule } from '@ngrx/store';
import { store } from './store';

import { NgApexchartsModule } from 'ng-apexcharts';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ItemMenuComponent } from './components/drawer/item-menu/item-menu.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TitlePageComponent } from './components/title-page/title-page.component';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart.component';
import { FinancialControlComponent } from './pages/financial-control/financial-control.component';
import { ObjectivesComponent } from './pages/objectives/objectives.component';
import { PlanningComponent } from './pages/planning/planning.component';
import { FinancialEducationComponent } from './pages/financial-education/financial-education.component';

@NgModule({
  declarations: [
    AppComponent,
    DrawerComponent,
    ToolbarComponent,
    ItemMenuComponent,
    DashboardComponent,
    TitlePageComponent,
    BarChartComponent,
    FinancialControlComponent,
    ObjectivesComponent,
    PlanningComponent,
    FinancialEducationComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ ...store }),
    AppRoutingModule,
    BrowserAnimationsModule,
    NgApexchartsModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatExpansionModule,
    MatCardModule,
    MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
