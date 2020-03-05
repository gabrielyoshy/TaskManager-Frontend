import { Component, OnInit, HostBinding, Inject } from "@angular/core";
import { ServiceService } from "../../../Service/service.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { Aufgabe } from "src/app/Models/Aufgabe";
import { Projekt } from "src/app/Models/Projekt";
import { Skill } from "src/app/Models/Skill";
import { findIndex } from "rxjs/operators";

export interface DialogData {
  gewahltes_projekt: number;
  name: string;
  beschreibung: string;
  aufwandsschatzung: number;
  beginnt: Date;
  endet: Date;
  skill: number;
  minDate: Date;
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

  gewahltes_projekt: number;
  name: string;
  beschreibung: string;
  aufwandsschatzung: number;
  beginnt: Date;
  endet: Date;
  skill: number;

  panelOpenState = false;
  @HostBinding("class") classes = "row";

  projekte: any = [];
  aufgaben: any = [];
  skills: any = [];
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

  async init() {
    try {
      await this.service.getKunden().subscribe(
        res => {
          this.kunden = res;
        },
        err => console.error(err)
      );
    } catch (error) {
      throw new Error(`kunden error`);
    }
    //Skills
    try {
      await this.service.getSkills().subscribe(
        res => {
          this.skills = res;
        },
        err => console.error(err)
      );
    } catch (error) {
      throw new Error(`skills error`);
    }
    //Aufgaben
    try {
      await this.service.getAufgaben().subscribe(
        res => {
          for (let aufgabe of res) {
            const skill = this.skills.filter(cons => {
              return cons.id_skill == aufgabe.skill;
            })[0];
            //console.log(projekt_edit);
            aufgabe.skill = skill;
            this.aufgaben.push(aufgabe);
          }
        },
        err => console.error(err)
      );
    } catch (error) {
      throw new Error(`aufgaben error`);
    }
    //Projekte
    try {
      await this.service.getProjekte().subscribe(
        res => {
          for (let projekt of res) {
            //das sucht den Kunden
            const kunde = this.kunden.filter(proj => {
              return proj.id_kunde == projekt.kunde;
            })[0];
            projekt.kunde = kunde;

            //das sucht die Aufgaben
            const aufgaben = this.aufgaben.filter(res => {
              return res.projekt == projekt.id_projekt;
            });

            projekt.aufgaben = aufgaben;

            this.projekte.push(projekt);
          }
        },
        err => console.error(err)
      );
    } catch (error) {
      throw new Error(`Projekte error`);
    }
    //console.log(this.projekte);
  }

  goToNewProjekt() {
    this.router.navigate(["/prokekte/add"]);
  }

  deleteProjekt(id: number) {
    //console.log(this.projekte);

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

  saveNewAufgabe(data) {
    const aufgabe = new Aufgabe();
    aufgabe.projekt = new Projekt();
    aufgabe.projekt.id_projekt = data.gewahltes_projekt;
    aufgabe.name = data.name;
    aufgabe.beschreibung = data.beschreibung;
    aufgabe.geschatzter_aufwand = data.aufwandsschatzung;
    aufgabe.beginnt = data.beginnt;
    aufgabe.endet = data.endet;
    aufgabe.skill = new Skill();
    aufgabe.skill.id_skill = data.skill;

    console.log(JSON.stringify(aufgabe));

    this.service.saveAufgabe(aufgabe).subscribe(
      res => {
        let index = this.getIndexProjekt(aufgabe.projekt.id_projekt);
        this.projekte[index].aufgaben.push(aufgabe);
        console.log(this.projekte);
      },
      err => console.error(err)
    );
  }

  getIndexProjekt(id_projekt) {
    var index = -1;
    this.projekte.filter(function(producto, i) {
      if (producto.id_projekt === id_projekt) {
        index = i;
      }
    });
    return index;
  }

  deleteAufgabe(id_projekt: number, id_aufgabe: number) {
    //console.log(this.projekte);

    this.service.deleteAufgabe(id_aufgabe).subscribe(
      res => {
        //Hier entferne ich die Aufgabe aus der Ansicht
        let index = this.getIndexProjekt(id_projekt);
        this.projekte[index].aufgaben = this.projekte[index].aufgaben.filter(
          e => {
            return e.id_aufgabe !== id_aufgabe;
          }
        );
      },
      err => console.error(err)
    );
  }

  openDialog(projekt_id: number): void {
    const dialogRef = this.dialog.open(NeueAufgabe, {
      data: {
        gewahltes_projekt: projekt_id,
        name: this.name,
        beschreibung: this.beschreibung,
        aufwandsschatzung: this.aufwandsschatzung,
        beginnt: new Date(),
        endet: this.endet,
        skill: this.skill,
        minDate: new Date()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(JSON.stringify(result));
      this.saveNewAufgabe(result);
    });
  }
}

@Component({
  selector: "neue-aufgabe",
  templateUrl: "neue-aufgabe.html"
})
export class NeueAufgabe {
  ende_datum: Date;
  constructor(
    public dialogRef: MatDialogRef<NeueAufgabe>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  calcularFecha(pt: number, datum: Date) {
    let cant_wochenende = Math.trunc(pt / 7);
    datum.getDay() + (pt % 7) >= 6 ? (cant_wochenende += 1) : "";

    pt += cant_wochenende * 2;

    this.data.endet = new Date(datum.getTime() + pt * 24 * 60 * 60 * 1000);
  }
}
