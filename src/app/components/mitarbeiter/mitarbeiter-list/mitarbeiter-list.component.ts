import { Component, OnInit } from "@angular/core";
import { ServiceService } from "../../../Service/service.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-mitarbeiter-list",
  templateUrl: "./mitarbeiter-list.component.html",
  styleUrls: ["./mitarbeiter-list.component.css"]
})
export class MitarbeiterListComponent implements OnInit {
  mitarbeiter: any = [];

  constructor(private service: ServiceService, private router: Router) {}

  ngOnInit(): void {
    this.service.getMitarbeiter().subscribe(
      res => {
        this.mitarbeiter = res;

        console.log(this.mitarbeiter[3].skill);
      },
      err => console.error(err)
    );
  }

  deleteMitarbeiter(id: number) {
    this.service.deleteSkill(id).subscribe(
      res => {
        let mitarb = this.mitarbeiter.filter(e => {
          return e.id_skill !== id;
        });

        this.mitarbeiter = mitarb;
      },
      err => console.error(err)
    );
  }
}
