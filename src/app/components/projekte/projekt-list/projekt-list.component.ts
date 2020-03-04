import { Component, OnInit, HostBinding, Inject } from "@angular/core";
import { ServiceService } from "../../../Service/service.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: "app-projekt-list",
  templateUrl: "./projekt-list.component.html",
  styleUrls: ["./projekt-list.component.css"]
})
export class ProjektListComponent implements OnInit {
  //esto es para la prueba de las tareas
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  animal: string;
  name: string;

  panelOpenState = false;
  @HostBinding("class") classes = "row";

  projekte: any = [];
  kunden: any = [];

  constructor(
    private service: ServiceService,
    private router: Router,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.init();

    //para las tareas
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ["", Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ["", Validators.required]
    });
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
    console.log(this.projekte);

    this.service.deleteProjekt(id).subscribe(
      res => {
        let pr = this.projekte.filter(e => {
          return e.id_projekt !== id;
        });

        this.projekte = pr;
      },
      err => console.error(err)
    );
  }

  editProjekt(id: number) {}

  //Dialog Aufgabe
  // openDialog(): void {
  //   const dialogRef = this.dialog.open(NeueAufgabe, {
  //     width: "250px",
  //     data: { name: this.name, animal: this.animal }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log("The dialog was closed");
  //     this.animal = result;
  //   });
  // }
}

@Component({
  selector: "neue-aufgabe",
  templateUrl: "neue-aufgabe.html"
})
export class NeueAufgabe {
  constructor(
    public dialogRef: MatDialogRef<NeueAufgabe>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
