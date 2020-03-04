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

import { MatButtonModule } from "@angular/material/button";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatSliderModule } from "@angular/material/slider";
import { MatStepperModule } from "@angular/material/stepper";
import { MatFormFieldModule } from "@angular/material/form-field";

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
    SkillAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatExpansionModule,
    MatCardModule,
    MatIconModule,
    MatSliderModule,
    MatStepperModule,
    MatFormFieldModule
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {}
