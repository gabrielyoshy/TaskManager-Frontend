import { Component, OnInit, HostBinding, Inject } from "@angular/core";
import { ServiceService } from "../../../Service/service.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogConfig
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

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: "Angular For Beginners"
    };

    this.dialog.open(NeueAufgabe, dialogConfig);
  }
}

@Component({
  selector: "neue-aufgabe",
  templateUrl: "neue-aufgabe.html",
  styleUrls: ["neue-aufgabe.css"]
})
export class NeueAufgabe implements OnInit {
  form: FormGroup;
  description: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NeueAufgabe>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.description = data.description;
  }

  ngOnInit() {
    this.form = this.fb.group({
      description: [this.description, []]
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
