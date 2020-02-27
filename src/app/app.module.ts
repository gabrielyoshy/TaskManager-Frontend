import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './Skill/list/list.component';
import { AddComponent } from './Skill/add/add.component';
import { EditComponent } from './Skill/edit/edit.component';
import { DeleteComponent } from './Skill/delete/delete.component';
import { FormsModule } from '@angular/forms';
import { ServiceService } from '../app/Service/service.service'
import { HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    AddComponent,
    EditComponent,
    DeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
