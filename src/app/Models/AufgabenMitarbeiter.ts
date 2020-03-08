import { Mitarbeiter } from "./Mitarbeiter";
import { Aufgabe } from "./Aufgabe";

export class AufgabenMitarbeiter {
  id_aufgab_mitarb: number;
  ab: Date;
  bis: Date;
  aufgabe: Aufgabe;
  mitarbeiter: Mitarbeiter;
}
