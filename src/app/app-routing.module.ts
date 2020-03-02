import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KundeListComponent  } from './components/kunde/kunde-list/kunde-list.component';
import { KundeAddComponent  } from './components/kunde/kunde-add/kunde-add.component';

import { ProjektListComponent  } from './components/projekte/projekt-list/projekt-list.component';
import { ProjektAddComponent } from './components/projekte/projekt-add/projekt-add.component';

import { SkillListComponent  } from './components/skills/skill-list/skill-list.component';
import { SkillAddComponent } from './components/skills/skill-add/skill-add.component';

import { MitarbeiterListComponent  } from './components/mitarbeiter/mitarbeiter-list/mitarbeiter-list.component';
import { MitarbeiterAddComponent } from './components/mitarbeiter/mitarbeiter-add/mitarbeiter-add.component';

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
    path: 'kunden',
    component: KundeListComponent
  },
  {
    path: 'kunde/add',
    component: KundeAddComponent
  },
  {
    path: 'kunde/edit/:id',
    component: KundeAddComponent
  },
  {
    path: 'skill',
    component: SkillListComponent
  },
  {
    path: 'skill/add',
    component: SkillAddComponent
  },
  {
    path: 'skill/edit/:id',
    component: SkillAddComponent
  },
  {
    path: 'mitarbeiter',
    component: MitarbeiterListComponent
  },
  {
    path: 'mitarbeiter/add',
    component: MitarbeiterAddComponent
  },
  {
    path: 'mitarbeiter/edit/:id',
    component: MitarbeiterAddComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
