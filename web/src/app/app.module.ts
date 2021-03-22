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
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

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
import { LineChartComponent } from './components/charts/line-chart/line-chart.component';
import { DialogFinancialControlComponent } from './pages/financial-control/dialog-financial-control/dialog-financial-control.component';
import { SearchHeaderComponent } from './components/search-header/search-header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogNewObjectivesComponent } from './pages/objectives/dialog-new-objectives/dialog-new-objectives.component';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { RadialChartComponent } from './components/charts/radial-chart/radial-chart.component';
import { CardObjectiveComponent } from './pages/objectives/card-objective/card-objective.component';
import { PostComponent } from './pages/financial-education/post/post.component';

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
    LineChartComponent,
    DialogFinancialControlComponent,
    SearchHeaderComponent,
    DialogNewObjectivesComponent,
    RadialChartComponent,
    CardObjectiveComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ ...store }),
    AppRoutingModule,
    BrowserAnimationsModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatExpansionModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'pt-br'},],
  entryComponents: [
    DialogFinancialControlComponent,
    DialogNewObjectivesComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
