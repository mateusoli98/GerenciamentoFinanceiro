import { RoutesEnum } from './enums/routes.unum';
import { AccountComponent } from './pages/authentication/account/account.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/authentication/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialControlComponent } from './pages/financial-control/financial-control.component';
import { FinancialEducationComponent } from './pages/financial-education/financial-education.component';
import { PlanningComponent } from './pages/planning/planning.component';
import { ObjectivesComponent } from './pages/objectives/objectives.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: RoutesEnum.Dashboard, pathMatch: 'full' },
      { path: RoutesEnum.Dashboard, component: DashboardComponent },
      {
        path: RoutesEnum.FinancialControl,
        component: FinancialControlComponent,
      },
      { path: RoutesEnum.Objectives, component: ObjectivesComponent },
      { path: RoutesEnum.Planning, component: PlanningComponent },
      {
        path: RoutesEnum.FinacialEducation,
        component: FinancialEducationComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', redirectTo: RoutesEnum.Login, pathMatch: 'full' },
      { path: RoutesEnum.Login, component: LoginComponent },
      { path: RoutesEnum.Account, component: AccountComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
