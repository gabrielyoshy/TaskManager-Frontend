import { Component, OnInit, HostBinding } from "@angular/core";
import { Kunde } from "src/app/Models/Kunde";
import { ActivatedRoute, Router } from "@angular/router";
import { ServiceService } from "src/app/Service/service.service";

@Component({
  selector: "app-kunde-add",
  templateUrl: "./kunde-add.component.html",
  styleUrls: ["./kunde-add.component.css"]
})
export class KundeAddComponent implements OnInit {
  @HostBinding("class") classes = "row";

  kunde: Kunde = {
    id_kunde: 0,
    vorname: "",
    nachname: ""
  };

  edit: boolean = false;

  constructor(
    private service: ServiceService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const params = this.activedRoute.snapshot.params;
    if (params.id) {
      this.service.getKunde(params.id).subscribe(
        res => {
          console.log(res);
          this.kunde = res;
          this.edit = true;
        },
        err => console.error(err)
      );
    }
  }

  saveNewKunde() {
    delete this.kunde.id_kunde;

    this.service.saveKunde(this.kunde).subscribe(
      res => {
        console.log(res);
        this.router.navigate(["/kunden"]);
      },
      err => console.error(err)
    );
  }

  editKunde() {
    this.service.updateKunde(this.kunde.id_kunde, this.kunde).subscribe(
      res => {
        console.log(res);
        this.router.navigate(["/kunden"]);
      },
      err => console.error(err)
    );
  }
}
