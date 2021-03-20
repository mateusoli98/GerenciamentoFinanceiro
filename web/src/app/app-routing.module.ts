import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialControlComponent } from './pages/financial-control/financial-control.component';
import { FinancialEducationComponent } from './pages/financial-education/financial-education.component';
import { PlanningComponent } from './pages/planning/planning.component';
import { ObjectivesComponent } from './pages/objectives/objectives.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'financial-control', component: FinancialControlComponent },
  { path: 'objectives', component: ObjectivesComponent },
  { path: 'planning', component: PlanningComponent },
  { path: 'financial-education', component: FinancialEducationComponent },
  { path: '**', redirectTo: '/dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
