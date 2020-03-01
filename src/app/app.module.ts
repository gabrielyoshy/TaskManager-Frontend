import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ServiceService } from '../app/Service/service.service'
import { HttpClientModule} from '@angular/common/http';




import { NavigationComponent } from './components/navigation/navigation.component';
import { KundeAddComponent } from './components/kunde/kunde-add/kunde-add.component';
import { KundeListComponent } from './components/kunde/kunde-list/kunde-list.component';
import { ProjektAddComponent } from './components/projekte/projekt-add/projekt-add.component';
import { ProjektListComponent } from './components/projekte/projekt-list/projekt-list.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    KundeAddComponent,
    KundeListComponent,
    ProjektAddComponent,
    ProjektListComponent
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
