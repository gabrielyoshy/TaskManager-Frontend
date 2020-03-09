import { Component, OnInit } from "@angular/core";
import { ServiceService } from "../../../Service/service.service";
import { Router } from "@angular/router";
import { HttpClient, HttpEventType } from "@angular/common/http";

import { Skill } from "src/app/Models/Skill";

@Component({
  selector: "app-skill-list",
  templateUrl: "./skill-list.component.html",
  styleUrls: ["./skill-list.component.css"]
})
export class SkillListComponent implements OnInit {
  skills: any = [];

  constructor(
    private service: ServiceService,
    private router: Router,
    private httpClient: HttpClient
  ) {}

  retrievedImage: any;
  retrieveResonse: any;

  ngOnInit(): void {
    this.service.getSkills().subscribe(
      res => {
        this.skills = res;
        this.getImage();
      },
      err => console.error(err)
    );
  }

  deleteSkill(id: number) {
    this.service.deleteSkill(id).subscribe(
      res => {
        let sk = this.skills.filter(e => {
          return e.id_skill !== id;
        });

        this.skills = sk;
      },
      err => console.error(err)
    );
  }

  getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.

    for (let index = 0; index < this.skills.length; index++) {
      this.httpClient
        .get(
          "http://localhost:9090/taskmanager/image/get/" +
            this.skills[index].image
        )
        .subscribe(res => {
          this.retrieveResonse = res;

          let base64Data = this.retrieveResonse.picByte;

          this.retrievedImage = "data:image/jpeg;base64," + base64Data;
          this.skills[index].image = this.retrievedImage;
        });
    }
  }
}
