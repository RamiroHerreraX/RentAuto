import { Component, OnInit } from '@angular/core';
import { Sucursales } from '../../Sucursales';
import { Paises } from '../../Paises';
import { Estados } from '../../Estado';
import { Ciudades } from '../../Ciudades';
import { PaisesService } from '../../services/paises.service';
import { EstadosService } from '../../services/estados.service';
import { CiudadesService } from '../../services/ciudades.service';
import { SucursalesService } from '../../services/sucursales.service';

@Component({
  selector: 'app-admin-sucursales',
  templateUrl: './admin-sucursales.component.html',
  styleUrls: ['./admin-sucursales.component.css']
})
export class AdminSucursalesComponent implements OnInit {
  mostrarFormularioPaises: boolean = false;
  mostrarFormularioEstado: boolean = false;
  mostrarFormularioCiudad: boolean = false;
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
  filtroPais: string = ''; // Agrega esta línea para definir la propiedad filtroPais
  filtroCiudad: string = '';
  filtroEstado: string = '';

  constructor(
    private paisesService: PaisesService,
    private estadosService: EstadosService,
    private ciudadesService: CiudadesService,
    private sucursalesService: SucursalesService
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
    this.estadosService.getEstados()
      .subscribe(data => {
        this.estados = data;
      });
  }

  loadCiudades(): void {
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

  addSucursal(event: Event): void {
    event.preventDefault();
    const newSucursal: Sucursales = {
      nombrePais: this.pais,
      nombreEstado: this.estado,
      nombreCiudad: this.ciudad,
      nombreSucursal: this.nombreSucursal,
      identificacionSucursal: this.identificacionSucursal,
      direccion: this.direccion
    };
    this.sucursalesService.addSucursal(newSucursal)
      .subscribe(sucursal => {
        this.sucursales.push(sucursal);
        // Limpiar campos después de agregar la sucursal
        this.resetForm();
      });
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

  // Implementa aquí métodos adicionales según sea necesario para la funcionalidad de la sucursal

}
