import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'detail/:id/:listLanguage/:qCode', loadChildren: './pages/detail/detail.module#DetailPageModule' },
  { path: 'detail/:id/:listLanguage/:title/:qCode', loadChildren: './pages/detail/detail.module#DetailPageModule' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
