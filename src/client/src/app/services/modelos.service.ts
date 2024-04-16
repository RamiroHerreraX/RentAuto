import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Modelos } from '../modelos';

@Injectable({
  providedIn: 'root'
})
export class ModelosService {
  domain: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Modelos 
  getModelos(): Observable<Modelos[]> {
    return this.http.get<Modelos[]>(`${this.domain}/api/modelos`)
      .pipe(map(res => res));
  }

  addModelo(newModelo: Modelos): Observable<any> {
    return this.http.post<Modelos>(`${this.domain}/api/modelos`, newModelo)
      .pipe(map(res => res));
  }

  updateModelo(updateModelo: Modelos): Observable<any> {
    return this.http.put(`${this.domain}/api/modelos/${updateModelo._id}`, updateModelo)
      .pipe(map(res => res));
  }
  
  deleteModelo(id: string): Observable<any> {
    return this.http.delete(`${this.domain}/api/modelos/${id}`)
      .pipe(map(res => res));
  }
}