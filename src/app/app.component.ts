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
  dialogPersonne:boolean;
  // title = 'dWeb-front';
  // username: string;
  // object: string;
  // selPlace: string;
  // text: string | undefined;


  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getPersonnes();
  }

  addPersonne(){
    this.dialogPersonne = true ; 
  }


  getPersonnes() {
    this.dataService.getData().subscribe((response: any) => {

      this.data = response;
      console.log(this.data)

    }, (error: any) => {
      console.log(error);
    });
  }





}
