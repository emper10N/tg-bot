import { Routes } from '@angular/router';
import { VotePageComponent } from './pages/vote-page/vote-page.component';

export const routes: Routes = [
  { path: '', component: VotePageComponent, pathMatch: 'full' },
];
