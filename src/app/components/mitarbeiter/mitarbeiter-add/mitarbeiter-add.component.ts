import { Component, OnInit } from "@angular/core";
import { Mitarbeiter } from "src/app/Models/Mitarbeiter";
import { ServiceService } from "../../../Service/service.service";
import { ActivatedRoute, Router } from "@angular/router";

import { FormControl } from "@angular/forms";

@Component({
  selector: "app-mitarbeiter-add",
  templateUrl: "./mitarbeiter-add.component.html",
  styleUrls: ["./mitarbeiter-add.component.css"]
})
export class MitarbeiterAddComponent implements OnInit {
  mitarbeiter: Mitarbeiter = {
    id_mitarbeiter: 0,
    vorname: "",
    nachname: "",
    image: "",
    skill: null
  };

  edit: boolean = false;

  skills_selected = new FormControl();
  skills: any = [];

  constructor(
    private service: ServiceService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const params = this.activedRoute.snapshot.params;

    this.service.getSkills().subscribe(
      res => {
        this.skills = res;
      },
      err => console.error(err)
    );

    if (params.id) {
      this.service.getMitarbeite(params.id).subscribe(
        res => {
          console.log(res);
          this.mitarbeiter = res;
          this.edit = true;
          this.skills_selected.setValue(this.mitarbeiter.skill);
        },
        err => console.error(err)
      );
    }
  }

  saveNewMitarbeiter() {
    delete this.mitarbeiter.id_mitarbeiter;

    this.mitarbeiter.skill = this.skills_selected.value;

    this.service.saveMitarbeiter(this.mitarbeiter).subscribe(
      res => {
        //console.log(res);
        this.router.navigate(["/mitarbeiter"]);
      },
      err => console.error(err)
    );
  }

  editMitarbeiter() {
    this.service
      .updateMitarbeiter(this.mitarbeiter.id_mitarbeiter, this.mitarbeiter)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(["/mitarbeiter"]);
        },
        err => console.error(err)
      );
    //console.log(this.projekt);
  }
}
