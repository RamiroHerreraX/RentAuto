import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sucursales } from '../Sucursales';


@Injectable({
    providedIn: 'root'
  })
  export class SucursalesService {
    domain: string = 'http://localhost:3000';
  
    constructor(private http: HttpClient) { }
  
    // Paises 
    getPaises(): Observable<Sucursales[]> {
      return this.http.get<Sucursales[]>(`${this.domain}/api/sucursales`)
        .pipe(map(res => res));
    }
  
    addSucursal(newSucursal: Sucursales): Observable<any> {
      return this.http.post<Sucursales>(`${this.domain}/api/sucursales`, newSucursal)
        .pipe(map(res => res));
    }
  
    updateSucursal(updatedSucursal: Sucursales): Observable<any> {
      return this.http.put(`${this.domain}/api/sucursales/${updatedSucursal._id}`, updatedSucursal)
        .pipe(map(res => res));
    }
    
    deleteSucursal(id: string): Observable<any> {
      return this.http.delete(`${this.domain}/api/sucursales/${id}`)
        .pipe(map(res => res));
    }

    getSucursales(): Observable<Sucursales[]> {
      return this.http.get<Sucursales[]>(`${this.domain}/api/sucursales`)
        .pipe(map(res => res));
    }
  
    
  }
  