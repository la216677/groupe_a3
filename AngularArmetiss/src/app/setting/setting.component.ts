import { Society } from './models/society';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GestionService } from '../gestion-ventes/gestion.service';
import { SocietyService } from './society.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
})
export class SettingComponent implements OnInit {


  societyData: any; // Données de l'entreprise

  constructor(
    private route: ActivatedRoute,
    private gestionService: GestionService,
    private societyService: SocietyService,
    private router: Router
    )
    {}

  ngOnInit() {
      this.getInfoSociete();
  }

  getInfoSociete() {
    this.gestionService.getInfoSociete().subscribe(
      (data: Society[]) => {
        this.societyData = data;
        console.table(this.societyData);
      },
      //en cas d'erreur on affiche le msg dans la console
      (err) => {
        console.log(err);
      }
    );
  }

  submitForm() {
    // Envoyez les données du formulaire modifiées au backend ou effectuez d'autres opérations nécessaires
    this.societyService.updateInfoSociete(this.societyData)
      .subscribe(()=>this.router.navigate(['/settings']));
  }
}
