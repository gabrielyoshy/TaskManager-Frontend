import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { Skill } from '../Models/Skill';
import { Projekt } from '../Models/Projekt';
import { Kunde } from '../Models/Kunde';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  Url='http://localhost:9090/taskmanager';

  /* Interface mit Projekte*/  
  getProjekte(){
    return this.http.get<any>(`${this.Url}/projekt/list`);
  }

  getProjekt(id: number){
    return this.http.get<Projekt>(`${this.Url}/projekt/list/${id}`);
  }

  deleteProjekt(id: number){
    return this.http.delete(`${this.Url}/projekt/delete/${id}`)
  }

  saveProjekt(projekt: Projekt){
    return this.http.post(`${this.Url}/projekt/new/`, projekt);
  }

  updateProjekt(id: number, projekt: Projekt): Observable<Projekt>{
    return this.http.put<Projekt>(`${this.Url}/projekt/edit/`, projekt); 
  }


  /* Interface mit Kunde*/
  getKunde(){
    return this.http.get<any>(`${this.Url}/kunde/list`);
  }

  getKund(id: number){
    return this.http.get<Kunde>(`${this.Url}/kunde/list/${id}`);
  }

  deleteKunde(id: number){
    return this.http.delete(`${this.Url}/kunde/delete/${id}`)
  }

  saveKunde(kunde: Kunde){
    return this.http.post(`${this.Url}/kunde/new/`, kunde);
  }

  updateKunde(id: number, kunde: Kunde): Observable<Kunde>{
    return this.http.put<Kunde>(`${this.Url}/kunde/edit/`, kunde); 
  }
  

  createSkill(skill:Skill){

    return this.http.post<Skill>(this.Url, skill);
  }
}
