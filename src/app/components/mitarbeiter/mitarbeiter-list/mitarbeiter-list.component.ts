import { Component, OnInit } from "@angular/core";
import { ServiceService } from "../../../Service/service.service";
import { Router } from "@angular/router";
import { HttpClient, HttpEventType } from "@angular/common/http";

@Component({
  selector: "app-mitarbeiter-list",
  templateUrl: "./mitarbeiter-list.component.html",
  styleUrls: ["./mitarbeiter-list.component.css"]
})
export class MitarbeiterListComponent implements OnInit {
  mitarbeiter: any = [];

  retrievedImage: any;
  retrieveResonse: any;
  constructor(
    private service: ServiceService,
    private router: Router,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.service.getMitarbeiter().subscribe(
      res => {
        this.mitarbeiter = res;
        this.getImage();
        //console.log(this.mitarbeiter[3].skill);
      },
      err => console.error(err)
    );
  }

  deleteMitarbeiter(id: number) {
    console.log(id);
    this.service.deleteMitarbeiter(id).subscribe(
      res => {
        let mitarb = this.mitarbeiter.filter(e => {
          return e.id_mitarbeiter !== id;
        });

        this.mitarbeiter = mitarb;
      },
      err => console.error(err)
    );
  }
  getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.

    for (let index = 0; index < this.mitarbeiter.length; index++) {
      this.httpClient
        .get(
          "http://localhost:9090/taskmanager/image/get/" +
            this.mitarbeiter[index].image
        )
        .subscribe(res => {
          this.retrieveResonse = res;

          let base64Data = this.retrieveResonse.picByte;

          this.retrievedImage = "data:image/jpeg;base64," + base64Data;
          this.mitarbeiter[index].image = this.retrievedImage;
        });
      for (
        let index2 = 0;
        index2 < this.mitarbeiter[index].skill.length;
        index2++
      ) {
        this.httpClient
          .get(
            "http://localhost:9090/taskmanager/image/get/" +
              this.mitarbeiter[index].skill[index2].image
          )
          .subscribe(res => {
            this.retrieveResonse = res;

            let base64Data = this.retrieveResonse.picByte;

            this.retrievedImage = "data:image/jpeg;base64," + base64Data;
            this.mitarbeiter[index].skill[index2].image = this.retrievedImage;
          });
      }
    }
  }
}
