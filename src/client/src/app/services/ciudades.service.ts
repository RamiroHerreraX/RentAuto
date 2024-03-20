import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ciudades } from '../Ciudades';

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {
  domain: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Ciudades
  getCiudades(): Observable<Ciudades[]> {
    return this.http.get<Ciudades[]>(`${this.domain}/api/ciudades`)
      .pipe(map(res => res));
  }

  addCiudad(newCiudad: Ciudades): Observable<any> {
    return this.http.post<Ciudades>(`${this.domain}/api/ciudades`, newCiudad)
      .pipe(map(res => res));
  }

  updateCiudad(updatedCiudad: Ciudades): Observable<any> {
    return this.http.put(`${this.domain}/api/ciudades/${updatedCiudad._id}`, updatedCiudad)
      .pipe(map(res => res));
  }
  
  deleteCiudad(id: string): Observable<any> {
    return this.http.delete(`${this.domain}/api/ciudades/${id}`)
      .pipe(map(res => res));
  }
}
