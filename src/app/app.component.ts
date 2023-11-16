import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

import { PrimeNGConfig, ConfirmationService } from 'primeng/api';
import { MessageService, ConfirmEventType } from 'primeng/api';
import { SelectItem } from 'primeng/api';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class AppComponent implements OnInit {
  // Variable pour stocker les données récupérées
  data: any;
  dialogAddPersonne: boolean;
  dialogEditPersonne: boolean;
  dialogPrint: boolean;

  Genre: any
  Prenom: any;
  Nom: any;
  Contact: any;
  AVS: any;
  Adresse: any;
  id: number;

  dateDuJour: any = new Date();

  jour: any = this.dateDuJour.getDate();
  mois: any = this.dateDuJour.toLocaleString('fr-FR', { month: 'long' });
  annee: any = this.dateDuJour.getFullYear();
  dateFormatee: string = `Sion, le ${this.jour} ${this.mois} ${this.annee}`;

  moisListe: SelectItem[]; // Liste des mois
  moisSelectionne: any; // Mois sélectionné

  workHour:number=0;
  base:number=22;
  salaireHoraire:number=0;
  pourcentVac:number= 10.64;
  suppVac:number=0;
  totBrut:number=0;
  


  constructor(private dataService: DataService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    // console.log(this.dateFormatee);
    this.getPersonnes();
    this.initialiserMois();
    this.getPersonnes();
  }

  calcSal(){
    this.salaireHoraire = Number((this.workHour*this.base).toFixed(2));
    this.suppVac = Number(((this.salaireHoraire/100)*this.pourcentVac).toFixed(2));
    this.totBrut= this.salaireHoraire+this.suppVac;
  }

  initialiserMois() {
    const dateActuelle = new Date();
    const moisActuel = dateActuelle.getMonth();
    const nomsMois = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];

    this.moisListe = nomsMois.map((mois, index) => {
      return { label: mois, value: index };
    });

    // Sélectionne le mois précédent
    if (moisActuel > 0) {
      this.moisSelectionne = this.moisListe[moisActuel - 1];
    } else {
      this.moisSelectionne = this.moisListe[11]; // Sélectionne décembre si le mois actuel est janvier
    }
  }

  showDialogAddPersonne() {
    this.dialogAddPersonne = true;
  }
  showDialogEditPersonne(element: any) {
    // console.log(element)
    this.dialogEditPersonne = true;

    this.id = element.id
    this.Genre = element.data.genre
    this.Prenom = element.data.prenom
    this.Nom = element.data.nom
    this.Contact = element.data.contact
    this.AVS = element.data.AVS
    this.Adresse = element.data.Adress
  }




  showInfo(type: string, message: string) {
    this.messageService.add({ severity: type, summary: 'Info', detail: message });
  }

  addPersonne() {
    let data = {
      "genre": this.Genre,
      "prenom": this.Prenom,
      "nom": this.Nom,
      "contact": this.Contact,
      "AVS": this.AVS,
      "Adress": this.Adresse
    }
    this.dataService.addData(data).subscribe((response: any) => {
      // console.log(response.status);
      if (response.status == true) {
        this.dialogAddPersonne = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `${data.nom}  ${data.prenom} a été ajouté(e)` });
        this.setDefault();
      } else {
        this.messageService.add({ severity: 'error', summary: 'Erreures', detail: `${data.nom}  ${data.prenom} n'a pas été ajouté(e)` });

      }
    });

  }
  editPersonne() {
    // console.log(this.id)
    let data = {
      "genre": this.Genre,
      "prenom": this.Prenom,
      "nom": this.Nom,
      "contact": this.Contact,
      "AVS": this.AVS,
      "Adress": this.Adresse
    }

    this.dataService.editPersonne(data, this.id).subscribe((response: any) => {
      // console.log(response.status);
      if (response.status == true) {
        this.dialogAddPersonne = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `${data.nom}  ${data.prenom} a été modifié(e)` });
        this.setDefault();
      } else {
        this.messageService.add({ severity: 'error', summary: 'Erreures', detail: `${data.nom}  ${data.prenom} n'a pas été modifié(e)` });

      }
    });

  }


  getPersonnes() {
    this.dataService.getData().subscribe((response: any) => {
      this.data = response;
    }, (error: any) => {
      console.log(error);
    });
  }

  deletePersonne(element: any) {
    // console.log(element.id)
    this.confirmationService.confirm({
      acceptLabel: "Oui",
      rejectLabel: "Non",
      message: `Etes-vous sur de vouloir supprimer cette personne du systeme ? nom:  ${element.data.nom} prenom : ${element.data.prenom}`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        try {
          this.dataService.deletePersonne(element.id);
          this.messageService.add({ severity: 'info', summary: 'Confiramtion', detail: `${element.data.nom} a été supprimé` });
          this.setDefault();
        } catch (error) {
          this.messageService.add({ severity: 'warn', summary: 'Erreures', detail: `${error}` });
        }

      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'information', detail: `${element.data.nom} n'a pas été supprimé` });
      }
    })
  }


 


  showPrint(element) {
    this.dialogPrint = true;

    this.id = element.id
    this.Genre = element.data.genre
    this.Prenom = element.data.prenom
    this.Nom = element.data.nom
    this.Contact = element.data.contact
    this.AVS = element.data.AVS
    this.Adresse = element.data.Adress



  }

  print() {
    console.log("print !")
    console.log('Mois sélectionné : ', this.moisSelectionne);
    // envoie des données a l api 

  }

  setDefault() {
    this.data = [];
    this.getPersonnes();
    this.id = 0
    this.Genre = ''
    this.Prenom = ''
    this.Nom = ''
    this.Contact = ''
    this.AVS = ''
    this.Adresse = ''
    this.annee = this.dateDuJour.getFullYear();
  }



}
