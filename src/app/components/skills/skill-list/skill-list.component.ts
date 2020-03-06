import { Component, OnInit } from "@angular/core";
import { ServiceService } from "../../../Service/service.service";
import { Router } from "@angular/router";

import { Skill } from "src/app/Models/Skill";

@Component({
  selector: "app-skill-list",
  templateUrl: "./skill-list.component.html",
  styleUrls: ["./skill-list.component.css"]
})
export class SkillListComponent implements OnInit {
  skills: any = [];

  constructor(private service: ServiceService, private router: Router) {}

  ngOnInit(): void {
    this.service.getSkills().subscribe(
      res => {
        this.skills = res;
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
}
