import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../Service/service.service'
import { Skill } from 'src/app/Model/Skill';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  skills:Skill[];
  constructor(private service:ServiceService, private router: Router ) { }

  ngOnInit() {
    this.service.getSkill()
    .subscribe(data=>{
      this.skills=data;
    })
  }

}
