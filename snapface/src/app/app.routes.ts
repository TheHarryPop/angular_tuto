import { Routes } from '@angular/router';
import {FaceSnapListComponent} from './face-snap-list/face-snap-list.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {SingleSingleFaceSnapComponent} from './single-face-snap/single-single-face-snap.component';
import {NewFaceSnapComponent} from './new-face-snap/new-face-snap.component';
import {AuthComponent} from './auth/auth.component';
import {AuthGuard} from './guard/auth.guard';

export const routes: Routes = [
  {path: '', component: LandingPageComponent, canActivate: [AuthGuard]},
  {path: 'facesnaps', component: FaceSnapListComponent, canActivate: [AuthGuard]},
  {path: 'facesnaps/:id', component: SingleSingleFaceSnapComponent, canActivate: [AuthGuard]},
  {path: 'create', component: NewFaceSnapComponent, canActivate: [AuthGuard]},
  {path: 'auth/login', component: AuthComponent}
];
