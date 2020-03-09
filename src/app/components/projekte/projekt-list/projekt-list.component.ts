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
import { AufgabenMitarbeiter } from "src/app/Models/AufgabenMitarbeiter";
import { JsonPipe } from "@angular/common";
import { NeuerTeil } from "./neuer-teil";
import { Mitarbeiter } from "src/app/Models/Mitarbeiter";

export interface DialogData {
  gewahltes_projekt: number;
  name: string;
  beschreibung: string;
  aufwandsschatzung: number;
  beginnt: Date;
  endet: Date;
  skill: number;
  minDate: Date;
  maxDate: Date;
  skills: [];
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
  aufgabenMitarbeiter: any = [];
  mitarbeiters: any = [];

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
    //mitarbeiters
    try {
      await this.service.getMitarbeiter().subscribe(
        res => {
          this.mitarbeiters = res;
        },
        err => console.error(err)
      );
    } catch (error) {
      throw new Error(`skills error`);
    }
    //aufgaben-Mitarbeiter

    this.aufgabenMitarbeiter = await this.service.getAufgabenMitarbeiter();
    //console.log(this.aufgabenMitarbeiter);

    //Aufgaben
    try {
      await this.service.getAufgaben().subscribe(
        res => {
          for (let aufgabe of res) {
            //skill -> aufgabe
            const skill = this.skills.filter(e => {
              return e.id_skill == aufgabe.skill;
            })[0];
            aufgabe.skill = skill;
            //teilen -> aufgabe
            // const ohneMitarbeiter = this.aufgabenMitarbeiter.filter(e => {
            //   return e.aufgabe == aufgabe.id_aufgabe;
            // });
            // //mitarbeiter--->teil
            // let mitMitarbeiter = [];
            // for (let teil of ohneMitarbeiter) {
            //   const mitarbeiter = this.mitarbeiters.filter(e => {
            //     return (e.id_mitarbeiter = teil.mitarbeiter);
            //   });
            //   mitMitarbeiter.push(mitarbeiter);
            // }
            const teile = this.aufgabenMitarbeiter.filter(e => {
              return e.aufgabe == aufgabe.id_aufgabe;
            });
            aufgabe.teile = teile;
            this.aufgaben.push(aufgabe);
          }
        },
        err => console.error(err)
      );
    } catch (error) {
      throw new Error(`aufgaben error`);
    }
    console.log(this.aufgaben);
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

    //console.log(JSON.stringify(aufgabe));

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

  getIndexAufgabe(indexPr, id_aufgabe) {
    var index = -1;

    this.projekte[indexPr].aufgaben.filter(function(aufgabe, i) {
      if (aufgabe.id_aufgabe === id_aufgabe) {
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

  openDialog(projekt: Projekt): void {
    let fruhestenDate: Date;
    let maxDate: Date;

    /**
     * Hier prüfen Sie, ob das Projekt irgendwelche Aufgaben hat. In diesem Fall wird das nächste Startdatum einen Tag nach dessen Ende liegen. Andernfalls ist das Startdatum das des Projekts.
     * (24 * 60 * 60 * 1000) = 1 tag in Milisekunden
     */

    let index = this.getIndexProjekt(projekt.id_projekt);
    let cant_aufgaben = this.projekte[index].aufgaben.length;

    if (cant_aufgaben === 0) {
      fruhestenDate = new Date(projekt.fruheste_stardat);
    } else {
      let aux = new Date(
        this.projekte[index].aufgaben[cant_aufgaben - 1].endet
      );
      fruhestenDate = new Date(aux.getTime() + 24 * 60 * 60 * 1000);
    }

    const dialogRef = this.dialog.open(NeueAufgabe, {
      data: {
        gewahltes_projekt: projekt.id_projekt,
        name: this.name,
        beschreibung: this.beschreibung,
        aufwandsschatzung: this.aufwandsschatzung,
        beginnt: fruhestenDate,
        endet: this.endet,
        skill: this.skill,
        minDate: fruhestenDate,
        maxDate: new Date(projekt.spatestes_enddat),
        skills: this.skills
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(JSON.stringify(result));
      result ? this.saveNewAufgabe(result) : console.log("Kein result");
    });
  }

  aufgabeEinfugen(projekt: Projekt, aufgabe: Aufgabe) {
    // // Erster Teil
    let teil = new AufgabenMitarbeiter();
    let idAufgabe = new Aufgabe();
    idAufgabe.id_aufgabe = aufgabe.id_aufgabe;

    teil.ab = aufgabe.beginnt;
    teil.bis = aufgabe.endet;
    teil.aufgabe = idAufgabe;

    // //aus dem zweiten Teil
    if (aufgabe.teile.length > 0) {
      let indexTeil = aufgabe.teile.length;
      ////   console.log(aufgabe);
      let letzterTag = new Date(aufgabe.teile[indexTeil - 1].bis);
      teil.ab = new Date(letzterTag.getTime() + 24 * 60 * 60 * 1000);
    }

    // console.log(JSON.stringify(teil));

    const dialogRef = this.dialog.open(NeuerTeil, {
      data: {
        teil: teil,
        mitarbeiters: this.mitarbeiters,
        minAb: new Date(teil.ab),
        maxBis: new Date(teil.bis)
      }
    });

    dialogRef.afterClosed().subscribe(async result => {
      //console.log(result);
      if (result) {
        let indexPr = await this.getIndexProjekt(projekt.id_projekt);
        let indexAufgabe = await this.getIndexAufgabe(
          indexPr,
          aufgabe.id_aufgabe
        );
        let mitarbeiter = new Mitarbeiter();
        mitarbeiter.id_mitarbeiter = result.mitarbeiter;
        teil.mitarbeiter = mitarbeiter;
        teil.bis = result.maxBis;
        this.service.saveAufgabeMitarbeiter(teil).subscribe(result => {
          //console.log(JSON.stringify(teil));
          this.projekte[indexPr].aufgaben[indexAufgabe].teile.push(teil);
        });

        console.log(this.projekte[indexPr].aufgaben[indexAufgabe]);
      }
      //result ? this.saveNewAufgabe(result) : console.log("Kein result");
    });
  }

  deleteTeil(id_projekt: number, id_aufgabe: number, id_aufgab_mitarb: number) {
    this.service.deleteAufgabeMitarbeiter(id_aufgab_mitarb).subscribe(
      async res => {
        //Hier entferne ich die Aufgabe aus der Ansicht
        let indexPr = await this.getIndexProjekt(id_projekt);
        let indexAufgabe = await this.getIndexAufgabe(indexPr, id_aufgabe);
        this.projekte[indexPr].aufgaben[indexAufgabe].teile = this.projekte[
          indexPr
        ].aufgaben[indexAufgabe].teile.filter(e => {
          return e.id_aufgab_mitarb !== id_aufgab_mitarb;
        });
      },
      err => console.error(err)
    );
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
