import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

import { PrimeNGConfig, ConfirmationService } from 'primeng/api';
import { MessageService, ConfirmEventType } from 'primeng/api';
import { SelectItem } from 'primeng/api';

import { saveAs } from 'file-saver';

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

  workHour: any = 0;//temp remettre a 0 en fin de dev
  base: any = 0;
  salaireHoraire: any = 0;
  divers: any = 0;
  pourcentVac: any = 10.64;
  suppVac: any = 0;

  totBrut: any = 0;//

  avsaiapg: any = 5.3;
  ac: any = 1.1;
  aanp: any = 1.38
  afam: any = 0.421;
  impotSource: any = 0.85;
  lpp: any = 3.18;

  avsaiapgM: any = 0;
  acM: any = 0;
  aanpM: any = 0;
  afamM: any = 0;
  impotSourceM: any = 0;
  lppM: any = 0;

  totdeductions: any = 0;

  salaireNet: any = 0;



  constructor(private dataService: DataService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    // console.log(this.dateFormatee);
    this.getPersonnes();
    this.initialiserMois();
    this.getPersonnes();
    //enlever apres 
    this.calcSal();
  }
 //calculate data of tab
  // calcSal() {
  //   this.salaireHoraire = Number((this.workHour * this.base).toFixed(2));
  //   this.suppVac = Number(((this.salaireHoraire / 100) * this.pourcentVac).toFixed(2));
  //   this.totBrut = Number((this.salaireHoraire + this.suppVac + this.divers).toFixed(2));

  //   this.avsaiapgM = Number(((this.totBrut / 100) * this.avsaiapg).toFixed(2))
  //   this.acM = Number(((this.totBrut / 100) * this.ac).toFixed(2))
  //   this.aanpM = Number(((this.totBrut / 100) * this.aanp).toFixed(2))
  //   this.afamM = Number(((this.totBrut / 100) * this.afam).toFixed(2))
  //   this.impotSourceM = Number(((this.totBrut / 100) * this.impotSource).toFixed(2))
  //   this.lppM = Number(((this.totBrut / 100) * this.lpp).toFixed(2))

  //   this.totdeductions = Number((this.avsaiapgM + this.acM + this.aanpM + this.afamM + this.impotSourceM + this.lppM).toFixed(2));

  //   this.salaireNet = Number((this.totBrut - this.totdeductions).toFixed(2))
  // }
  calcSal() {
    this.salaireHoraire = (this.workHour * this.base).toFixed(2);
    this.suppVac = ((Number(this.salaireHoraire) / 100) * this.pourcentVac).toFixed(2);
    this.totBrut = (Number(this.salaireHoraire) + Number(this.suppVac) + Number(this.divers)).toFixed(2);

    this.avsaiapgM = ((Number(this.totBrut / 100)) * Number(this.avsaiapg)).toFixed(2)
    this.acM = ((Number(this.totBrut / 100)) * Number(this.ac)).toFixed(2)
    this.aanpM = ((Number(this.totBrut / 100)) * Number(this.aanp)).toFixed(2)
    this.afamM = ((Number(this.totBrut / 100)) * Number(this.afam)).toFixed(2)
    this.impotSourceM = ((Number(this.totBrut) / 100) * Number(this.impotSource)).toFixed(2)
    this.lppM = ((Number(this.totBrut / 100)) * Number(this.lpp)).toFixed(2)

    this.totdeductions = (Number(this.avsaiapgM) + Number(this.acM) + Number(this.aanpM) + Number(this.afamM) + Number(this.impotSourceM) + Number(this.lppM)).toFixed(2);

    this.salaireNet =(Number(this.totBrut) - Number(this.totdeductions)).toFixed(2)
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
        this.dialogEditPersonne = false;
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

    this.workHour = 0;
    this.base = 22;
    this.salaireHoraire = 0;
    this.pourcentVac = 10.64;
    this.suppVac = 0;
    this.divers = 0;

    this.totBrut = 0;//

    this.avsaiapg = 5.3;
    this.ac = 1.1;
    this.aanp = 1.38
    this.afam = 0.421;
    this.impotSource = 0.85;
    this.lpp = 4.5;
    this.avsaiapgM = 0;
    this.acM = 0;
    this.aanpM = 0;
    this.afamM = 0;
    this.impotSourceM = 0;
    this.lppM = 0;
    this.totdeductions = 0;
  }

  print() {
    console.log("print !")
    console.log('Mois sélectionné : ', this.moisSelectionne.label);
    console.log(this.divers);
    let fiche = {
      "genre": this.Genre,
      "prenom": this.Prenom,
      "nom": this.Nom,
      "contact": this.Contact,
      "date": this.dateFormatee,
      "avs": this.AVS,
      "mois": this.moisSelectionne.label,
      "annee": this.annee,
      "workHour": this.workHour,
      "base": this.base,
      "salaireHoraire": this.salaireHoraire,
      "pourcentVac": this.pourcentVac,
      "suppVac": this.suppVac,
      "divers": this.divers,
      "totBrut": this.totBrut,
      "avsaiapg": this.avsaiapg,
      "ac": this.ac,
      "aanp": this.aanp,
      "afam": this.afam,
      "lpp": this.lpp,
      "impotSource": this.impotSource,
      "avsaiapgM": this.avsaiapgM,
      "acM": this.acM,
      "aanpM": this.aanpM,
      "afamM": this.afamM,
      "lppM": this.lppM,
      "impotSourceM": this.impotSourceM,
      "totDeductions": this.totdeductions,
      "SalaireNet": this.salaireNet
    }
    console.log(fiche);

    this.dataService.print(fiche).subscribe(
      (responseBlob: Blob) => {
        const filename = 'fiche_salaire_de_' + fiche.nom + '_' + fiche.prenom + '.pdf';
        saveAs(responseBlob, filename);

        this.dialogPrint = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `Construction en cours de la fiche de salaire de ${fiche.nom} ${fiche.prenom}.` });
        this.setDefault();
      },
      (error) => {
        console.error('Erreur lors de la récupération du fichier PDF:', error);
        this.messageService.add({ severity: 'error', summary: 'Erreurs', detail: `La fiche de salaire de ${fiche.nom} ${fiche.prenom} n'a pas pu être construite.` });
      }
    );

    this.setDefault();
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
