import { Routes } from '@angular/router';
import {FaceSnapListComponent} from './face-snap-list/face-snap-list.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {SingleSingleFaceSnapComponent} from './single-face-snap/single-single-face-snap.component';
import {NewFaceSnapComponent} from './new-face-snap/new-face-snap.component';

export const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'facesnaps', component: FaceSnapListComponent},
  {path: 'facesnaps/:id', component: SingleSingleFaceSnapComponent},
  {path: 'create', component: NewFaceSnapComponent},
];
