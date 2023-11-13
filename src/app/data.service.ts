import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root' // Vous pouvez utiliser 'root' pour enregistrer le service au niveau de l'application
})


export class DataService {

  constructor(private http: HttpClient) { }

  // Méthode pour effectuer une requête HTTP GET et récupérer les données
  public getData() {
    const url = 'http://localhost:3000/getPersonnes'; 
    return this.http.get(url);
  }

  public postD(data: any) {
    const apiUrl = 'http://localhost:3000/api/addD'; 
    return this.http.post(apiUrl, data);
  }

}
