import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';
import { Skill } from 'src/app/Model/Skill';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private router:Router, private service:ServiceService) { }

  ngOnInit(): void {
  }

  Save(skill:Skill){
    this.service.createSkill(skill)
    .subscribe(data=>{
      alert("Done!");
      this.router.navigate(["list"]);
    })
  }

}
