import { Component, OnInit } from '@angular/core';
import { Sucursales } from '../../Sucursales';
import { Paises } from '../../Paises';
import { Estados } from '../../Estado';
import { Ciudades } from '../../Ciudades';
import { PaisesService } from '../../services/paises.service';
import { EstadosService } from '../../services/estados.service';
import { CiudadesService } from '../../services/ciudades.service';
import { SucursalesService } from '../../services/sucursales.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sucursales',
  templateUrl: './admin-sucursales.component.html',
  styleUrls: ['./admin-sucursales.component.css']
})
export class AdminSucursalesComponent implements OnInit {
  paises: Paises[] = [];
  estados: Estados[] = [];
  ciudades: Ciudades[] = [];
  sucursales: Sucursales[] = [];
  pais: string = '';
  estado: string = '';
  ciudad: string = '';
  nombreSucursal: string = '';
  identificacionSucursal: string = '';
  direccion: string = '';

  constructor(
    private paisesService: PaisesService,
    private estadosService: EstadosService,
    private ciudadesService: CiudadesService,
    private sucursalesService: SucursalesService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loadPaises();
    this.loadEstados();
    this.loadCiudades();
    this.loadSucursales();
  }

  loadPaises(): void {
    this.paisesService.getPaises()
      .subscribe(data => {
        this.paises = data;
      });
  }

  loadEstados(): void {
    // Cargar los estados inicialmente
    this.estadosService.getEstados()
      .subscribe(data => {
        this.estados = data;
      });
  }

  loadCiudades(): void {
    // Cargar las ciudades inicialmente
    this.ciudadesService.getCiudades()
      .subscribe(data => {
        this.ciudades = data;
      });
  }

  loadSucursales(): void {
    this.sucursalesService.getSucursales()
      .subscribe(data => {
        this.sucursales = data;
      });
  }

  addSucursal(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
  
    const newSucursal: Sucursales = {
      nombrePais: this.pais,
      nombreEstado: this.estado,
      nombreCiudad: this.ciudad,
      nombreSucursal: this.nombreSucursal,
      identificacionSucursal: this.identificacionSucursal,
      direccion: this.direccion
    };
  
    this.sucursalesService.addSucursal(newSucursal).subscribe(
      (response: Sucursales) => {
        console.log('Sucursal agregada exitosamente');
        this.sucursales.push(response); // Agregar la nueva sucursal a la lista
        this.resetForm(); // Limpiar los campos del formulario
      },
      error => {
        console.error('Error al agregar la sucursal:', error);
        // Manejar error de agregación si es necesario
      }
    );
  }
  
  resetForm(): void {
    this.pais = '';
    this.estado = '';
    this.ciudad = '';
    this.nombreSucursal = '';
    this.identificacionSucursal = '';
    this.direccion = '';
  }

  deleteSucursal(id: string): void {
    this.sucursalesService.deleteSucursal(id)
      .subscribe(() => {
        this.sucursales = this.sucursales.filter(sucursal => sucursal._id !== id);
      });
  }

  onChangePais(): void {
    // Limpiar la selección de estado y ciudad al cambiar de país
    this.estado = '';
    this.ciudad = '';
    this.loadEstados();
  }

  onChangeEstado(): void {
    // Limpiar la selección de ciudad al cambiar de estado
    this.ciudad = '';
    this.loadCiudades();
  }

  login() {
    // Redirige al usuario a la página de inicio de sesión
    this.router.navigateByUrl('/login');
}
}
