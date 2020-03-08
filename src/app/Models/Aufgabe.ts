import { Skill } from "./Skill";
import { Projekt } from "./Projekt";

export class Aufgabe {
  id_aufgabe?: number;
  name?: String;
  beschreibung?: String;
  geschatzter_aufwand?: Number;
  beginnt?: Date;
  endet?: Date;
  skill: Skill;
  projekt: Projekt;
  teile: any = [];
}
