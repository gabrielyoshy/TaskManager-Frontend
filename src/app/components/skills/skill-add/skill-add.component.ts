import { Component, OnInit } from "@angular/core";
import { Skill } from "src/app/Models/Skill";
import { ServiceService } from "../../../Service/service.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-skill-add",
  templateUrl: "./skill-add.component.html",
  styleUrls: ["./skill-add.component.css"]
})
export class SkillAddComponent implements OnInit {
  skill: Skill = {
    id_skill: 0,
    name: "",
    beschreibung: "",
    level: "",
    image: ""
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
      this.service.getSkill(params.id).subscribe(
        res => {
          console.log(res);
          this.skill = res;
          this.edit = true;
        },
        err => console.error(err)
      );
    }
  }

  saveNewSkill() {
    delete this.skill.id_skill;

    this.service.saveSkill(this.skill).subscribe(
      res => {
        this.router.navigate(["/skill"]);
      },
      err => console.error(err)
    );
  }

  editSkill() {
    this.service.updateSkill(this.skill.id_skill, this.skill).subscribe(
      res => {
        console.log(res);
        this.router.navigate(["/skill"]);
      },
      err => console.error(err)
    );
    //console.log(this.projekt);
  }
}
