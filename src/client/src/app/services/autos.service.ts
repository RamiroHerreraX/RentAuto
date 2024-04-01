import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Auto } from '../autos';

@Injectable({
  providedIn: 'root'
})
export class AutosService {
  private domain = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  getAutos() {
    return this.http.get<Auto[]>(`${this.domain}/api/Vehiculo`).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  addAuto(newAuto: Auto) {
    return this.http.post<Auto>(`${this.domain}/api/Vehiculo`, newAuto).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  deleteAuto(id: string) {
    return this.http.delete<Auto>(`${this.domain}/api/Vehiculo/${id}`).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  updateAuto(newReserva: Auto) {
    return this.http.put(`${this.domain}/api/Vehiculo/${newReserva._id}`, newReserva).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong, please try again later.');
  }
}

