import { Component, OnInit, HostBinding, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { AufgabenMitarbeiter } from "src/app/Models/AufgabenMitarbeiter";

export interface DialogData {
  teil: AufgabenMitarbeiter;
  mitarbeiter: number;
  mitarbeiters: any[];
  minAb: Date;
  maxBis: Date;
}

@Component({
  selector: "neuer-teil",
  templateUrl: "neuer-teil.html"
})
export class NeuerTeil {
  ende_datum: Date;
  constructor(
    public dialogRef: MatDialogRef<NeuerTeil>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  calcularFecha(pt: number, datum: Date) {}
}
