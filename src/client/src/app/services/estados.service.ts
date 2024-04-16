import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Estados } from '../Estado';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {domain: string = 'http://localhost:3000';

constructor(private http: HttpClient) { }

// Estado
getEstados(): Observable<Estados[]> {
  return this.http.get<Estados[]>(`${this.domain}/api/estados`)
    .pipe(map(res => res));
}

addEstado(newEstado: Estados): Observable<any> {
  return this.http.post<Estados>(`${this.domain}/api/estados`, newEstado)
    .pipe(map(res => res));
}

updateEstado(updatedEstado: Estados): Observable<any> {
  return this.http.put(`${this.domain}/api/estados/${updatedEstado._id}`, updatedEstado)
    .pipe(map(res => res));
}

deleteEstado(id: string): Observable<any> {
  return this.http.delete(`${this.domain}/api/estados/${id}`)
    .pipe(map(res => res));
}

getEstadosPorPais(nombrePais: string): Observable<Estados[]> {
  return this.http.get<Estados[]>(`${this.domain}/api/estados/${nombrePais}`)
    .pipe(map(res => res));
}
}
