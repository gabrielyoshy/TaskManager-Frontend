import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './Skill/list/list.component';
import { AddComponent } from './Skill/add/add.component';
import { EditComponent } from './Skill/edit/edit.component';
import { DeleteComponent } from './Skill/delete/delete.component';


const routes: Routes = [
  {path:'list', component:ListComponent},
  {path:'add', component:AddComponent},
  {path:'edit', component:EditComponent},
  {path:'delete', component:DeleteComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
