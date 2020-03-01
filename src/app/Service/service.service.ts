import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Skill } from '../Models/Skill';
import { Projekt } from '../Models/Projekt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  Url='http://localhost:9090/taskmanager';

  getSkill(){
    }

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

  createSkill(skill:Skill){

    return this.http.post<Skill>(this.Url, skill);
  }
}
