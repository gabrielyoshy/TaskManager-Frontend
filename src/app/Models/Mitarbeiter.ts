import { Skill } from "./Skill";

export class Mitarbeiter {
  id_mitarbeiter: number;
  vorname: String;
  nachname: String;
  image: String;
  skill?: [Skill];
}
