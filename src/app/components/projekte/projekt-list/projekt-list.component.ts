import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../Service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projekt-list',
  templateUrl: './projekt-list.component.html',
  styleUrls: ['./projekt-list.component.css']
})
export class ProjektListComponent implements OnInit {

  projekte: any = [];
 
  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.service.getProjekte().subscribe(
      res => {
        this.projekte = res;
      },
      err => console.error(err)
    )  
  }

  goToNewProjekt(){
    this.router.navigate(["/prokekte/add"]);
  }
  
 

}
