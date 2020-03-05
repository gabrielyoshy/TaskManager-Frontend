import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Skill } from "../Models/Skill";
import { Projekt } from "../Models/Projekt";
import { Kunde } from "../Models/Kunde";
import { Mitarbeiter } from "../Models/Mitarbeiter";
import { Aufgabe } from "../Models/Aufgabe";

@Injectable({
  providedIn: "root"
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  Url = "http://localhost:9090/taskmanager";

  /* Interface mit Projekte*/

  getProjekte() {
    return this.http.get<any>(`${this.Url}/projekt/list`);
  }

  getProjekt(id: number) {
    return this.http.get<Projekt>(`${this.Url}/projekt/list/${id}`);
  }

  deleteProjekt(id: number) {
    return this.http.delete(`${this.Url}/projekt/delete/${id}`);
  }

  saveProjekt(projekt: Projekt) {
    return this.http.post(`${this.Url}/projekt/new/`, projekt);
  }

  updateProjekt(id: number, projekt: Projekt): Observable<Projekt> {
    return this.http.put<Projekt>(
      `${this.Url}/projekt/edit/${projekt.id_projekt}`,
      projekt
    );
  }

  /* Interface mit Kunden*/
  getKunden() {
    return this.http.get<any>(`${this.Url}/kunde/list`);
  }

  getKunde(id: number) {
    return this.http.get<Kunde>(`${this.Url}/kunde/list/${id}`);
  }

  deleteKunde(id: number) {
    return this.http.delete(`${this.Url}/kunde/delete/${id}`);
  }

  saveKunde(kunde: Kunde) {
    return this.http.post(`${this.Url}/kunde/new/`, kunde);
  }

  updateKunde(id: number, kunde: Kunde): Observable<Kunde> {
    return this.http.put<Kunde>(
      `${this.Url}/kunde/edit/${kunde.id_kunde}`,
      kunde
    );
  }

  /* Interface mit Skills*/
  getSkills() {
    return this.http.get<any>(`${this.Url}/skill/list`);
  }

  getSkill(id: number) {
    return this.http.get<Skill>(`${this.Url}/skill/list/${id}`);
  }

  deleteSkill(id: number) {
    return this.http.delete(`${this.Url}/skill/delete/${id}`);
  }

  saveSkill(skill: Skill) {
    return this.http.post(`${this.Url}/skill/new/`, skill);
  }

  updateSkill(id: number, skill: Skill): Observable<Skill> {
    return this.http.put<Skill>(
      `${this.Url}/skill/edit/${skill.id_skill}`,
      skill
    );
  }

  /* Interface mit Mitarbeiter*/
  getMitarbeiter() {
    return this.http.get<any>(`${this.Url}/mitarbeiter/list`);
  }

  getMitarbeite(id: number) {
    return this.http.get<Mitarbeiter>(`${this.Url}/mitarbeiter/list/${id}`);
  }

  deleteMitarbeiter(id: number) {
    return this.http.delete(`${this.Url}/mitarbeiter/delete/${id}`);
  }

  saveMitarbeiter(mitarbeiter: Mitarbeiter) {
    return this.http.post(`${this.Url}/mitarbeiter/new/`, mitarbeiter);
  }

  updateMitarbeiter(
    id: number,
    mitarbeiter: Mitarbeiter
  ): Observable<Mitarbeiter> {
    return this.http.put<Mitarbeiter>(
      `${this.Url}/mitarbeiter/edit/${mitarbeiter.id_mitarbeiter}`,
      mitarbeiter
    );
  }

  /* Interface mit Aufgaben*/
  getAufgaben() {
    return this.http.get<any>(`${this.Url}/aufgabe/list`);
  }

  getAufgabe(id: number) {
    return this.http.get<Aufgabe>(`${this.Url}/aufgabe/list/${id}`);
  }

  deleteAufgabe(id: number) {
    return this.http.delete(`${this.Url}/aufgabe/delete/${id}`);
  }

  saveAufgabe(aufgabe: Aufgabe) {
    return this.http.post(`${this.Url}/aufgabe/new/`, aufgabe);
  }

  updateAufgabe(id: number, aufgabe: Aufgabe): Observable<Aufgabe> {
    return this.http.put<Aufgabe>(
      `${this.Url}/aufgabe/edit/${aufgabe.id_aufgabe}`,
      aufgabe
    );
  }
}
