import { Component, OnInit, HostBinding } from '@angular/core';
import { Projekt } from 'src/app/Models/Projekt';
import { ActivatedRoute ,Router } from '@angular/router';

import { ServiceService } from '../../../Service/service.service';
import { Kunde } from 'src/app/Models/Kunde';

@Component({
  selector: 'app-projekt-add',
  templateUrl: './projekt-add.component.html',
  styleUrls: ['./projekt-add.component.css']
})
export class ProjektAddComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  projekt: Projekt = {
    id_projekt: 0,
    name: '',
    beschreibung: '',
    kunde:{
      id_kunde: 0,
      nachname: '',
      vorname: '',
    },
    fruheste_stardat: new Date(),
    spatestes_enddat: new Date(),
  }

  kunden: [];
  

  edit: boolean = false;

  constructor(
    private service: ServiceService, 
    private router: Router,
    private activedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {

    const params = this.activedRoute.snapshot.params;
    
    this.service.getKunden().subscribe(
      res => {
        console.log(res);
        this.kunden = res;
      },
      err => console.error(err)
    )

    if(params.id){
      this.service.getProjekt(params.id)
      .subscribe(
        res=>{
          console.log(res);
          this.projekt = res;
          this.edit = true;
        },
        err=> console.error(err)
      )
    }
  }

  saveNewProjekt(){
    delete this.projekt.id_projekt;
    
    this.service.saveProjekt(this.projekt)
    .subscribe(
      res=>{
        console.log(res);
        this.router.navigate(['/projekte']);
        },
      err=> console.error(err)
    )
  }

  editProjekt(){
    this.service.updateProjekt(this.projekt.id_projekt, this.projekt )
    .subscribe(
      res=>{
        console.log(res);
        this.router.navigate(['/projekte']);
      },
      err=> console.error(err)
    )
    //console.log(this.projekt);
  }

}
