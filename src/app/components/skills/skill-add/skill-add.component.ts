import { Component, OnInit } from "@angular/core";
import { Skill } from "src/app/Models/Skill";
import { ServiceService } from "../../../Service/service.service";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient, HttpEventType } from "@angular/common/http";

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
    private activedRoute: ActivatedRoute,
    private httpClient: HttpClient
  ) {}

  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;

  ngOnInit(): void {
    const params = this.activedRoute.snapshot.params;

    if (params.id) {
      this.service.getSkill(params.id).subscribe(
        res => {
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
        this.onUpload();
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

  //Gets called when the user selects an image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
    this.skill.image = this.selectedFile.name;
  }

  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);

    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append(
      "imageFile",
      this.selectedFile,
      this.selectedFile.name
    );

    //Make a call to the Spring Boot Application to save the image
    this.httpClient
      .post("http://localhost:9090/taskmanager/image/upload", uploadImageData, {
        observe: "response"
      })
      .subscribe(response => {
        if (response.status === 200) {
          this.message = "Image uploaded successfully";
        } else {
          this.message = "Image not uploaded successfully";
        }
      });
  }
}
