import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root' // Vous pouvez utiliser 'root' pour enregistrer le service au niveau de l'application
})


export class DataService {

  constructor(private http: HttpClient) { }

  status: any;
  
  // Méthode pour effectuer une requête HTTP GET et récupérer les données
  public getData() {
    const url = 'http://localhost:3000/getPersonnes'; 
    return this.http.get(url);
  }

  public addData(data:any) {
    const apiUrl = 'http://localhost:3000/addPersonne'; 
    return this.http.post(apiUrl, data);
  }

  public deletePersonne(personne:any) {
    this.http.delete(`http://localhost:3000/deletePersonne/${personne}`).subscribe(() => {
      this.status = 'Delete successful';
    }, (error: any) => {
      console.log(error);
      return error
    });
  }

}
