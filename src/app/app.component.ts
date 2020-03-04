import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
//import { NeueAufgabe } from "./components/projekte/projekt-list/projekt-list.component";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "TaskManager";

  constructor(private router: Router) {}

  List() {
    this.router.navigate(["list"]);
  }

  New() {
    this.router.navigate(["add"]);
  }
}
