import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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


  public print(dataToSend: any): Observable<Blob> {
    const apiUrl = 'http://localhost:3000/generate-pdf'; 
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, dataToSend, {
      headers: headers,
      responseType: 'blob'
    });
  }

  public addData(data:any) {
    const apiUrl = 'http://localhost:3000/addPersonne'; 
    return this.http.post(apiUrl, data);
  }


  public editPersonne(personne:any,id:number) {
    // console.log(personne)
    const apiUrl = `http://localhost:3000/updatePersonne/${id}`; 
    return this.http.put(apiUrl, personne);

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
