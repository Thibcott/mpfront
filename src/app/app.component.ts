import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

import { PrimeNGConfig, ConfirmationService } from 'primeng/api';
import { MessageService, ConfirmEventType } from 'primeng/api';



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
  Genre: any
  Prenom: any;
  Nom: any;
  Contact: any;
  AVS: any;
  Adresse: any;



  constructor(private dataService: DataService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.getPersonnes();
  }

  showDialogAddPersonne() {
    this.dialogAddPersonne = true;
  }
  showDialogEditPersonne(element: any) {
    console.log(element)
    this.dialogEditPersonne = true;

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
      console.log(response.status);
      if (response.status == true) {
        this.dialogAddPersonne = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `${data.nom}  ${data.prenom} a été ajouté(e)` });
        this.setDefault();
      } else {
        this.messageService.add({ severity: 'error', summary: 'Erreures', detail: `${data.nom}  ${data.prenom} n'a pas été ajouté(e)` });

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
    console.log(element.id)
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
          this.messageService.add({ severity: 'warn', summary: 'Errures', detail: `${error}` });
        }

      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'information', detail: `${element.data.nom} n'a pas été supprimé` });
      }
    })
  }


  print() {

  }

  setDefault() {
    //hey ici faut actualiser la page 
    this.data = [];
    this.getPersonnes();
  }



}
