import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KundeListComponent  } from './components/kunde/kunde-list/kunde-list.component';
import { KundeAddComponent  } from './components/kunde/kunde-add/kunde-add.component';

import { ProjektListComponent  } from './components/projekte/projekt-list/projekt-list.component';
import { ProjektAddComponent } from './components/projekte/projekt-add/projekt-add.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'projekte',
    pathMatch: 'full'
  },
  {
    path: 'projekte',
    component: ProjektListComponent
  },
  {
    path: 'projekte/add',
    component: ProjektAddComponent
  },
  {
    path: 'projekte/edit/:id',
    component: ProjektAddComponent
  },
  {
    path: 'kunde',
    component: KundeListComponent
  },
  {
    path: 'kunde/add',
    component: KundeAddComponent
  },
  {
    path: 'kunde/edit/:id',
    component: KundeAddComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
