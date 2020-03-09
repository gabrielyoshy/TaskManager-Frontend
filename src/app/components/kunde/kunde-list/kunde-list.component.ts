import { Component, OnInit, HostBinding } from "@angular/core";
import { ServiceService } from "../../../Service/service.service";
import { Router } from "@angular/router";
import { Kunde } from "src/app/Models/Kunde";

@Component({
  selector: "app-kunde-list",
  templateUrl: "./kunde-list.component.html",
  styleUrls: ["./kunde-list.component.css"]
})
export class KundeListComponent implements OnInit {
  @HostBinding("class") classes = "row";

  kunden: any = [];

  constructor(private service: ServiceService, private router: Router) {}

  ngOnInit(): void {
    this.getKunde();
  }

  getKunde() {
    this.service.getKunden().subscribe(
      res => {
        console.log(res);
        this.kunden = res;
      },
      err => console.error(err)
    );
  }

  deleteKunde(id: number) {
    this.service.deleteKunde(id).subscribe(
      res => {
        let e = this.kunden.filter(e => {
          return e.id_kunde !== id;
        });

        this.kunden = e;
      },
      err => console.error(err)
    );
  }
}
