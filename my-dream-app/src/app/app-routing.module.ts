import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListPageModule } from './pages/list/list.module';
import { DetailPageModule } from './pages/detail/detail.module';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'prefix' },
  { path: 'list', loadChildren: './pages/list/list.module#ListPageModule' },
  { path: 'detail/:id', loadChildren: './pages/detail/detail.module#DetailPageModule' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
