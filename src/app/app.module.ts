import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ServiceService } from "../app/Service/service.service";
import { HttpClientModule } from "@angular/common/http";

import { NavigationComponent } from "./components/navigation/navigation.component";
import { KundeAddComponent } from "./components/kunde/kunde-add/kunde-add.component";
import { KundeListComponent } from "./components/kunde/kunde-list/kunde-list.component";
import { ProjektAddComponent } from "./components/projekte/projekt-add/projekt-add.component";
import {
  ProjektListComponent,
  NeueAufgabe
} from "./components/projekte/projekt-list/projekt-list.component";
import { MitarbeiterAddComponent } from "./components/mitarbeiter/mitarbeiter-add/mitarbeiter-add.component";
import { MitarbeiterListComponent } from "./components/mitarbeiter/mitarbeiter-list/mitarbeiter-list.component";
import { SkillListComponent } from "./components/skills/skill-list/skill-list.component";
import { SkillAddComponent } from "./components/skills/skill-add/skill-add.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { LayoutModule } from "@angular/cdk/layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from "@angular/material/menu";

import { MatNativeDateModule } from "@angular/material/core";

import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";

import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";

import { MatFormFieldModule } from "@angular/material/form-field";

import { MatExpansionModule } from "@angular/material/expansion";
import { MatStepperModule } from "@angular/material/stepper";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { MatSliderModule } from "@angular/material/slider";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatChipsModule } from "@angular/material/chips";

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
    DashboardComponent,
    NeueAufgabe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatNativeDateModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatStepperModule,
    MatDialogModule,
    MatDatepickerModule,
    MatSelectModule,
    MatSliderModule,
    DragDropModule,
    MatChipsModule
  ],
  providers: [
    ServiceService,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: "fill" }
    }
  ],
  exports: [MatButtonModule, MatFormFieldModule, MatInputModule],
  bootstrap: [AppComponent],
  entryComponents: [NeueAufgabe, ProjektListComponent]
})
export class AppModule {}
