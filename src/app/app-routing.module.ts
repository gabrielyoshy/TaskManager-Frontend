import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KundeListComponent  } from './components/kunde/kunde-list/kunde-list.component';
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
    path: 'kunde',
    component: KundeListComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
