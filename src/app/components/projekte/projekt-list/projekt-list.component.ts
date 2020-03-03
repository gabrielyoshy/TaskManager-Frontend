import { Component, OnInit, HostBinding } from "@angular/core";
import { ServiceService } from "../../../Service/service.service";
import { Router } from "@angular/router";
import { Kunde } from "src/app/Models/Kunde";

@Component({
  selector: "app-projekt-list",
  templateUrl: "./projekt-list.component.html",
  styleUrls: ["./projekt-list.component.css"]
})
export class ProjektListComponent implements OnInit {
  @HostBinding("class") classes = "row";

  projekte: any = [];
  kunden: any = [];

  constructor(private service: ServiceService, private router: Router) {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.service.getKunden().subscribe(
      res => {
        this.kunden = res;
        this.service.getProjekte().subscribe(
          res => {
            for (let projekt of res) {
              this.projekte.push(this.findKunde(projekt));
            }

            console.log(this.projekte);
          },
          err => console.error(err)
        );
        //console.log(this.projekte);
      },
      err => console.error(err)
    );
  }

  findKunde(projekt) {
    //console.log(this.kunden);
    const kunde = this.kunden.filter(proj => {
      return proj.id_kunde == projekt.kunde;
    })[0];
    //console.log(projekt_edit);
    projekt.kunde = kunde;
    return projekt;
  }

  goToNewProjekt() {
    this.router.navigate(["/prokekte/add"]);
  }

  deleteProjekt(id: number) {
    this.service.deleteProjekt(id).subscribe(
      res => {
        console.log(res);
        //this.getProjekts;
      },
      err => console.error(err)
    );
  }

  editProjekt(id: number) {}
}
