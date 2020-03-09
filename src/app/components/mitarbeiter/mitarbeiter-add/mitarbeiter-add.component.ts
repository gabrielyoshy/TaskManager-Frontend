import { Component, OnInit } from "@angular/core";
import { Mitarbeiter } from "src/app/Models/Mitarbeiter";
import { ServiceService } from "../../../Service/service.service";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient, HttpEventType } from "@angular/common/http";
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
        this.onUpload();
        this.router.navigate(["/mitarbeiter"]);
      },
      err => console.error(err)
    );
  }

  editMitarbeiter() {
    this.mitarbeiter.skill = this.skills_selected.value;
    console.log(this.mitarbeiter);
    this.service
      .updateMitarbeiter(this.mitarbeiter.id_mitarbeiter, this.mitarbeiter)
      .subscribe(
        res => {
          !this.selectedFile ? "" : this.onUpload();

          this.router.navigate(["/mitarbeiter"]);
        },
        err => console.error(err)
      );
    //console.log(this.projekt);
  }

  //Gets called when the user selects an image
  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
    this.mitarbeiter.image = this.selectedFile.name;
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
