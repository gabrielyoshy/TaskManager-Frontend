import { Component, OnInit, HostBinding } from '@angular/core';
import { ServiceService } from '../../../Service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projekt-list',
  templateUrl: './projekt-list.component.html',
  styleUrls: ['./projekt-list.component.css']
})
export class ProjektListComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  projekte: any = [];
 
  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
      this.getProjekts();
  }

  getProjekts(){
    this.service.getProjekte().subscribe(
      res => {
        console.log(res);
        this.projekte = res;
      },
      err => console.error(err)
    )
  }

  goToNewProjekt(){
    this.router.navigate(["/prokekte/add"]);
  }
  
  deleteProjekt(id:number){
    this.service.deleteProjekt(id).subscribe(
      res =>{
        console.log(res);
        this.getProjekts;
      },
      err => console.error(err)
    )
  }

  editProjekt(id:number){
    
  }
 

}
