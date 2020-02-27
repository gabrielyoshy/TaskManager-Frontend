import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Skill } from '../Model/Skill';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  Url='http://localhost:9090/taskmanager-backend/skill';

  getSkill(){
    return this.http.get<Skill[]>(this.Url);
  }
}
