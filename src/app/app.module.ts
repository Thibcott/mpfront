import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditorModule } from 'primeng/editor';
import { AppComponent } from './app.component';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from "primeng/dropdown";
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from "primeng/dialog";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { SelectButtonModule } from 'primeng/selectbutton';


import { HttpClientModule } from '@angular/common/http'; // Importez HttpClientModule

import { DataService } from './data.service';


@NgModule({
  imports: [
    EditorModule,
    BrowserModule,
    BrowserAnimationsModule,
    InputMaskModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    SelectButtonModule,
    HttpClientModule // Ajoutez HttpClientModule aux imports
  ],
  providers: [
    DataService // Ajoutez votre service ici
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }
