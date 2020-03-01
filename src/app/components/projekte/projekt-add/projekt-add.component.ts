import { Component, OnInit, HostBinding } from '@angular/core';
import { Projekt } from 'src/app/Models/Projekt';

import { ServiceService } from '../../../Service/service.service';

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
    fruheste_stardat: new Date(),
    spatestes_enddat: new Date(),
  }

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
  }

  saveNewProjekt(){
    this.service.saveProjekt(this.projekt)
    .subscribe(
      res=>{
        console.log(res)
      },
      err=> console.error(err)
    )
  }

}
