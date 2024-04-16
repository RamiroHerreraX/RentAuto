import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Marcas } from '../marca';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {
  domain: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Marcas
  getMarcas(): Observable<Marcas[]> {
    return this.http.get<Marcas[]>(`${this.domain}/api/marcas`)
      .pipe(map(res => res));
  }

  addMarca(newMarca: Marcas): Observable<any> {
    return this.http.post<Marcas>(`${this.domain}/api/marcas`, newMarca)
      .pipe(map(res => res));
  }

  updateMarca(updateMarca: Marcas): Observable<any> {
    return this.http.put(`${this.domain}/api/marcas/${updateMarca._id}`, updateMarca)
      .pipe(map(res => res));
  }
  
  deleteMarca(id: string): Observable<any> {
    return this.http.delete(`${this.domain}/api/marcas/${id}`)
      .pipe(map(res => res));
  }
}