import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { ServiceService } from "../app/Service/service.service";
import { HttpClientModule } from "@angular/common/http";

import { NavigationComponent } from "./components/navigation/navigation.component";
import { KundeAddComponent } from "./components/kunde/kunde-add/kunde-add.component";
import { KundeListComponent } from "./components/kunde/kunde-list/kunde-list.component";
import { ProjektAddComponent } from "./components/projekte/projekt-add/projekt-add.component";
import { ProjektListComponent } from "./components/projekte/projekt-list/projekt-list.component";
import { MitarbeiterAddComponent } from "./components/mitarbeiter/mitarbeiter-add/mitarbeiter-add.component";
import { MitarbeiterListComponent } from "./components/mitarbeiter/mitarbeiter-list/mitarbeiter-list.component";
import { SkillListComponent } from "./components/skills/skill-list/skill-list.component";
import { SkillAddComponent } from "./components/skills/skill-add/skill-add.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MaterialModule } from "./material.module";
import { LayoutModule } from "@angular/cdk/layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    KundeAddComponent,
    KundeListComponent,
    ProjektAddComponent,
    ProjektListComponent,
    MitarbeiterAddComponent,
    MitarbeiterListComponent,
    SkillListComponent,
    SkillAddComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {}
