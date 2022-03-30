import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/authentication/login/login.component';
import { NewUserComponent } from './modules/authentication/new-user/new-user.component';
import { AdjustmentsComponent } from './modules/lost-found/adjustments/adjustments.component';
import { HomeComponent } from './modules/lost-found/home/home.component';
import { LfDetailsComponent } from './modules/lost-found/lf-details/lf-details.component';
import { LfListComponent } from './modules/lost-found/lf-list/lf-list.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "login", component: LoginComponent },
  { path: "newUser", component: NewUserComponent },
  { path: "newUser/:isManager", component: NewUserComponent },
  { path: "home", component: HomeComponent },
  { path: "lfList", component: LfListComponent },
  { path: "lfDetails", component: LfDetailsComponent },
  { path: "lfList/:typeAndId", component: LfListComponent },
  { path: "lfDetails/:typeAndId", component: LfDetailsComponent },
  { path: "adjustments", component: AdjustmentsComponent },
  { path: "adjustments/:typeAndId", component: AdjustmentsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
