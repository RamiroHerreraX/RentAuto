import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Autos } from '../autos';

@Injectable({
  providedIn: 'root'
})
export class AutosService {
  domain: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Obtener todos los autos
  getAutos(): Observable<Autos[]> {
    return this.http.get<Autos[]>(`${this.domain}/api/autos`)
      .pipe(map(res => res));
  }

  // Agregar un nuevo auto
  addAuto(newAuto: Autos): Observable<any> {
    return this.http.post<Autos>(`${this.domain}/api/autos`, newAuto)
      .pipe(map(res => res));
  }

  // Actualizar un auto existente
  updateAuto(updatedAuto: Autos): Observable<any> {
    return this.http.put(`${this.domain}/api/autos/${updatedAuto._id}`, updatedAuto)
      .pipe(map(res => res));
  }
  
  // Eliminar un auto por su ID
  deleteAuto(id: string): Observable<any> {
    return this.http.delete(`${this.domain}/api/autos/${id}`)
      .pipe(map(res => res));
  }
}
