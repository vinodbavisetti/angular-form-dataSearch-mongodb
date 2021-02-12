import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './other-components/dashboard/dashboard.component';
import { DataSearchComponent } from './user-components/data-search/data-search.component';
import { FormComponent } from './user-components/form/form.component';

const ROUTES: Routes = [
  { path: 'form', component: FormComponent },
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'datasearch', component: DataSearchComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
