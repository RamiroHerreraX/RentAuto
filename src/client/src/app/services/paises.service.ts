import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Paises } from '../Paises';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  domain: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Paises 
  getPaises(): Observable<Paises[]> {
    return this.http.get<Paises[]>(`${this.domain}/api/paises`)
      .pipe(map(res => res));
  }

  addPais(newPais: Paises): Observable<any> {
    return this.http.post<Paises>(`${this.domain}/api/paises`, newPais)
      .pipe(map(res => res));
  }

  updatePais(updatedPais: Paises): Observable<any> {
    return this.http.put(`${this.domain}/api/paises/${updatedPais._id}`, updatedPais)
      .pipe(map(res => res));
  }
  
  deletePais(id: string): Observable<any> {
    return this.http.delete(`${this.domain}/api/paises/${id}`)
      .pipe(map(res => res));
  }

  
}
