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
  dialogHistory: boolean;

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
  pourcentVac: any = 8.83;
  suppVac: any = 0;

  totBrut: any = 0;//
  newTotBrut: any = 0;

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
  freePrompt: string = "";
  freeMontant: number;
  retraite: any;

  valRetaite: any = "non";

  cRetraie: any[] = [
    { label: 'non', value: 'non' },
    { label: 'oui', value: 'oui' }
  ];
  hist: any;
  Liste: any;



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

  calcSal() {
    this.salaireHoraire = (this.workHour * this.base).toFixed(2);
    this.suppVac = ((Number(this.salaireHoraire) / 100) * this.pourcentVac).toFixed(2);
    this.totBrut = (Number(this.salaireHoraire) + Number(this.suppVac) + Number(this.divers) + Number(this.freeMontant)).toFixed(2);

    if (this.retraite == "oui") {
      console.log(this.retraite);


      console.log("totBrut", typeof (Number(this.totBrut)))
      console.log(Number(this.totBrut))

      console.log("new", typeof (Number(this.newTotBrut)))
      console.log(Number(this.newTotBrut))

      this.newTotBrut = (Number(this.totBrut) - 1400).toFixed(2);

      // this.calcSal();
    } else {
      this.newTotBrut = this.totBrut
    }
    console.log("calc function :", this.newTotBrut)
    this.avsaiapgM = ((Number(this.newTotBrut / 100)) * Number(this.avsaiapg)).toFixed(2)
    this.acM = ((Number(this.newTotBrut / 100)) * Number(this.ac)).toFixed(2)
    this.aanpM = ((Number(this.newTotBrut / 100)) * Number(this.aanp)).toFixed(2)
    this.afamM = ((Number(this.newTotBrut / 100)) * Number(this.afam)).toFixed(2)
    this.impotSourceM = ((Number(this.newTotBrut) / 100) * Number(this.impotSource)).toFixed(2)
    this.lppM = ((Number(this.newTotBrut / 100)) * Number(this.lpp)).toFixed(2)

    this.totdeductions = (Number(this.avsaiapgM) + Number(this.acM) + Number(this.aanpM) + Number(this.afamM) + Number(this.impotSourceM) + Number(this.lppM)).toFixed(2);

    this.salaireNet = (Number(this.totBrut) - Number(this.totdeductions)).toFixed(2)
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
    console.log(element)
    this.dialogEditPersonne = true;

    this.id = element.id
    this.Genre = element.data.genre
    this.Prenom = element.data.prenom
    this.Nom = element.data.nom
    this.Contact = element.data.contact
    this.AVS = element.data.AVS
    this.Adresse = element.data.Adress
  }

  // showDialogHistory(element:any) {
  //   this.getHistory(element.id)
  //   console.log(this.hist);


  // }

  getHistory(element: any) {
    this.hist = "";
    this.dataService.gethist(element.id).subscribe((response: any) => {
      this.hist = response;
      console.log(this.hist)
      this.dialogHistory = true;
      this.Prenom = element.data.prenom
      this.Nom = element.data.nom
      this.Liste = this.hist
    }, (error: any) => {
      console.log(error);
    });
  }





  showInfo(type: string, message: string) {
    this.messageService.add({ severity: type, summary: 'Info', detail: message });
  }

  addPersonne() {
    console.log(this.valRetaite)
    let data = {
      "genre": this.Genre,
      "prenom": this.Prenom,
      "nom": this.Nom,
      "contact": this.Contact,
      "AVS": this.AVS,
      "Adress": this.Adresse,
      "retraite": this.valRetaite
    }
    this.dataService.addData(data).subscribe((response: any) => {
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
    let data = {
      "genre": this.Genre,
      "prenom": this.Prenom,
      "nom": this.Nom,
      "contact": this.Contact,
      "AVS": this.AVS,
      "Adress": this.Adresse,
      "Retraite": this.valRetaite
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

  showPrint(element: any) {
    console.log(element)
    this.dialogPrint = true;
    
    this.id = element.id
    this.Genre = element.data.genre
    this.Prenom = element.data.prenom
    this.Nom = element.data.nom
    this.Contact = element.data.contact
    this.AVS = element.data.AVS
    this.Adresse = element.data.Adress
    this.retraite = element.data.Retraite
    console.log(this.retraite);

    this.workHour = element.workHour

    this.base = 25.26;
    this.salaireHoraire = 0;
    this.pourcentVac = 8.83;
    this.suppVac = 0;
    this.divers = 0;
    this.freePrompt = "";
    this.freeMontant = 0;

    this.totBrut = 0;

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
  
    this.calcSal();
  }


  showOldPrint(element:any ){
    console.log(element.id)
    this.dialogPrint = true;

    this.id = element.data.id_personne 
    this.Genre = element.data.genre
    this.Prenom = element.data.prenom
    this.Nom = element.data.nom
    this.Contact = element.data.contact
    this.AVS = element.data.AVS
    this.Adresse = element.data.Adress
    this.retraite = element.data.Retraite
    console.log(this.retraite);

    this.workHour = element.data.workHour


    this.base = element.data.base;
    this.salaireHoraire = element.data.salaireHoraire;
    this.pourcentVac =element.data.pourcentVac;
    this.suppVac = element.data.suppVac;
    this.divers = element.data.divers;
    this.freePrompt = element.data.freePrompt;
    this.freeMontant = element.data.freeMontant;

    this.totBrut = element.data.totBrut;

    this.avsaiapg = element.data.avsaiapg;
    this.ac = element.data.ac;
    this.aanp = element.data.aanp;
    this.afam = element.data.afam;
    this.impotSource = element.data.impotSource;
    this.lpp = element.data.lpp;
    this.avsaiapgM = element.data.avsaiapgM;
    this.acM = element.data.acM;
    this.aanpM = element.data.aanp;
    this.afamM = element.data.afamM;
    this.impotSourceM = element.data.impotSourceM;
    this.lppM = element.data.lppM;
    this.totdeductions = element.data.totdeductions;
    this.calcSal();

  }


  print() {
    console.log("print !")
    console.log('Mois sélectionné : ', this.moisSelectionne.label);
    console.log(this.id);
    let fiche = {
      "idPersonne": this.id,
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
      "freePrompt": this.freePrompt,
      "freeMontant": this.freeMontant,
      "totBrut": this.totBrut,
      "newtotBrut": this.newTotBrut,
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
    this.totBrut = 0;
    this.newTotBrut = 0;
  }
}
