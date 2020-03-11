import { Component, OnInit, HostBinding, Inject } from "@angular/core";
import { ServiceService } from "../../../Service/service.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { HttpClient, HttpEventType } from "@angular/common/http";

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { Aufgabe } from "src/app/Models/Aufgabe";
import { Projekt } from "src/app/Models/Projekt";
import { Skill } from "src/app/Models/Skill";
import { AufgabenMitarbeiter } from "src/app/Models/AufgabenMitarbeiter";
import { NeuerTeil } from "./neuer-teil";
import { Mitarbeiter } from "src/app/Models/Mitarbeiter";
import { ok } from "assert";

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
  //das ist für die aufgabe prüfung
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
  suche: string;

  constructor(
    private service: ServiceService,
    private router: Router,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    //das ist für die Aufgabe
    this.init();
  }

  async init() {
    this.kunden = await this.getKunden();
    //console.log(this.kunden);
    let skills = await this.getSkills();
    let mitarbeiters = await this.getMitarbeiters();

    let aufgabenMitarbeiter = await this.getAufgabenMitarbeiten(mitarbeiters);
    //console.log(aufgabenMitarbeiter);

    let aufgabens = await this.getAufgaben(skills, aufgabenMitarbeiter);
    let projekte = await this.getProjekte(this.kunden, aufgabens);

    //console.log(kunden);

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ["", Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ["", Validators.required]
    });
  }

  async getKunden() {
    this.kunden = await this.service.getKunden().toPromise();
    //console.log(kunden);
    return this.kunden;
  }

  async getSkills() {
    this.skills = await this.service.getSkills().toPromise();
    this.getImageSkills();
    return this.skills;
  }

  async getMitarbeiters() {
    this.mitarbeiters = await this.service.getMitarbeiter().toPromise();
    this.getImageMitarbeiter();
    return this.mitarbeiters;
  }

  async getAufgabenMitarbeiten(mitarbeiters) {
    this.aufgabenMitarbeiter = await this.service
      .getAufgabenMitarbeiter()
      .toPromise();
    //console.log(this.mitarbeiters);
    for (let index = 0; index < this.aufgabenMitarbeiter.length; index++) {
      let mitarbeiter = mitarbeiters.filter(res => {
        return (
          res.id_mitarbeiter == this.aufgabenMitarbeiter[index].mitarbeiter
        );
      });
      this.aufgabenMitarbeiter[index].mitarbeiter = mitarbeiter[0];
    }
    //console.log(this.aufgabenMitarbeiter);

    return this.aufgabenMitarbeiter;
  }

  async getAufgaben(skills, aufgabenMitarbeiter) {
    this.aufgaben = await this.service.getAufgaben().toPromise();
    for (let index = 0; index < this.aufgaben.length; index++) {
      const skill = skills.filter(e => {
        return e.id_skill == this.aufgaben[index].skill;
      })[0];
      this.aufgaben[index].skill = skill;

      //console.log(aufgabenMitarbeiter);
      const teile = aufgabenMitarbeiter.filter(e => {
        return e.aufgabe == this.aufgaben[index].id_aufgabe;
      });
      this.aufgaben[index].teile = teile;
    }
    //console.log(aufgabenMitarbeiter);

    return this.aufgaben;
  }

  async getProjekte(kunden, aufgabens) {
    let projekte = await this.service.getProjekte().toPromise();

    for (let projekt of projekte) {
      //das sucht den Kunden
      const kunde = kunden.filter(proj => {
        return proj.id_kunde == projekt.kunde;
      })[0];
      projekt.kunde = kunde;

      //das sucht die Aufgaben
      const aufgaben = aufgabens.filter(projekte => {
        return projekte.projekt == projekt.id_projekt;
      });

      projekt.aufgaben = aufgaben;

      this.projekte.push(projekt);
    }

    return this.projekte;
  }

  getImageSkills() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    let retrievedImage: any;
    let retrieveResonse: any;
    for (let index = 0; index < this.skills.length; index++) {
      this.httpClient
        .get(
          "http://localhost:9090/taskmanager/image/get/" +
            this.skills[index].image
        )
        .subscribe(res => {
          retrieveResonse = res;

          let base64Data = retrieveResonse.picByte;

          retrievedImage = "data:image/jpeg;base64," + base64Data;
          this.skills[index].image = retrievedImage;
        });
    }
  }

  getImageMitarbeiter() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    let retrievedImage: any;
    let retrieveResonse: any;
    for (let index = 0; index < this.mitarbeiters.length; index++) {
      this.httpClient
        .get(
          "http://localhost:9090/taskmanager/image/get/" +
            this.mitarbeiters[index].image
        )
        .subscribe(res => {
          retrieveResonse = res;

          let base64Data = retrieveResonse.picByte;

          retrievedImage = "data:image/jpeg;base64," + base64Data;
          this.mitarbeiters[index].image = retrievedImage;
        });
    }
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

  async aufgabeEinfugen(projekt: Projekt, aufgabe: Aufgabe) {
    // // Erster Teil
    let teil = new AufgabenMitarbeiter();
    let idAufgabe = new Aufgabe();
    idAufgabe.id_aufgabe = aufgabe.id_aufgabe;

    teil.ab = aufgabe.beginnt;
    teil.bis = aufgabe.endet;
    teil.aufgabe = idAufgabe;

    let ab = teil.ab.toString().substring(0, 10);
    let bis = teil.bis.toString().substring(0, 10);

    // //aus dem zweiten Teil
    if (aufgabe.teile.length > 0) {
      let indexTeil = aufgabe.teile.length;
      ////   console.log(aufgabe);
      let letzterTag = new Date(aufgabe.teile[indexTeil - 1].bis);
      teil.ab = new Date(letzterTag.getTime() + 24 * 60 * 60 * 1000);
      ab =
        teil.ab.getFullYear() +
        "-" +
        teil.ab.getMonth() +
        "-" +
        teil.ab.getDate();
    }

    console.log(ab);
    let mitarbeiters = await this.service
      .getVerfugbarMitarbeiter(ab, bis, aufgabe.skill.id_skill)
      .toPromise();

    for (let index = 0; index < mitarbeiters.length; index++) {
      mitarbeiters[index] = this.mitarbeiters.filter(mit => {
        return mit.id_mitarbeiter == mitarbeiters[index].id_mitarbeiter;
      })[0];
    }

    const dialogRef = this.dialog.open(NeuerTeil, {
      data: {
        teil: teil,
        mitarbeiters: mitarbeiters,
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

  projektSuche(value) {
    this.projekte = this.projekte.filter(obj => {
      return obj.name == value;
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
