import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class DataService {

  constructor(private http: HttpClient) { }

  status: any;
  link: string = "http://213.230.58.210:3000";
  // Méthode pour effectuer une requête HTTP GET et récupérer les données
  public getData() {
    const url = this.link + '/getPersonnes';
    return this.http.get(url);
  }

  public gethist(id: any) {
    console.log(id)
    const url = this.link + '/getHistoric/' + id;
    console.log(url)
    return this.http.get(url);
  }



  public print(dataToSend: any): Observable<Blob> {
    const apiUrl = this.link + '/generate-pdf';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(apiUrl, dataToSend, {
      headers: headers,
      responseType: 'blob'
    });
  }

  public addData(data: any) {
    const apiUrl = this.link + '/addPersonne';
    return this.http.post(apiUrl, data);
  }


  public editPersonne(personne: any, id: number) {
    // console.log(personne)
    const apiUrl = `${this.link}/updatePersonne/${id}`;
    return this.http.put(apiUrl, personne);

  }

  public deletePersonne(personne: any) {
    this.http.delete(`${this.link}/deletePersonne/${personne}`).subscribe(() => {
      this.status = 'Delete successful';
    }, (error: any) => {
      console.log(error);
      return error
    });
  }

}
