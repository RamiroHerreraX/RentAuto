import { Component, OnInit } from '@angular/core';
import { Sucursales } from '../../Sucursales';
import { Autos } from '../../autos';
import { Marcas } from '../../marca';
import { Modelos } from '../../modelos';
import { AutosService } from '../../services/autos.service';
import { MarcasService } from '../../services/marcas.service';
import { ModelosService } from '../../services/modelos.service';
import { SucursalesService } from '../../services/sucursales.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html',
  styleUrls: ['./autos.component.css']
})
export class AutosComponent implements OnInit {
  modelos: Modelos[] = [];
  autos: Autos[] = [];
  sucursales: Sucursales[] =[];
  marcas: Marcas[] = [];

  constructor(private modelosServices: ModelosService, private autosServices: AutosService, private sucursalesServices: SucursalesService,
    private marcasServices: MarcasService, private router:Router) { }

  ngOnInit(): void {
    this.loadModelos();
    this.loadAutos();
    this.loadSucursales();
    this.loadMarcas();
  }

  login() {
    // Redirige al usuario a la página de inicio de sesión
    this.router.navigateByUrl('/login');
}

  loadModelos(): void {
    this.modelosServices.getModelos()
      .subscribe(data => {
        this.modelos = data;
      });
  }

  loadAutos(): void {
    this.autosServices.getAutos()
      .subscribe(data2 => {
        this.autos = data2;
      })
  }

  loadSucursales(): void {
    this.sucursalesServices.getSucursales()
    .subscribe(data3 => {
      this.sucursales = data3;
    })
  }

  loadMarcas(): void {
    this.marcasServices.getMarcas()
      .subscribe(data4 => {
        this.marcas = data4;
      })
  }

  // Declare necessary properties for the new auto
  imagen: string = '';
  tipoAuto: string = '';
  nSerie: string = '';
  marca: string = '';
  mod: string = '';
  sucursalUbicacion: string[] = []; // Corrected the type here to string[]
  nAsientos: number | null = null;
  tamMaletero: string = '';
  complementos: string = '';
  costoDia: number | null = null;
  canDisponible: number | null = null;
  estatus: string = '';
  nuevaSucursal: string = '';

  updatingAuto: boolean = false;
  autoToUpdate: Autos | null = null; // Variable para almacenar el país que se está actualizando

  // Método para cargar el país seleccionado para actualizar
  cargarAutoSeleccionado(auto: Autos) {
    this.updatingAuto = true;
    this.autoToUpdate = auto;
    this.imagen = auto.imagen;
    this.tipoAuto = auto.tipoAuto;
    this.nSerie = auto.nSerie;
    this.marca = auto.marca;
    this.mod = auto.mod;
    this.sucursalUbicacion = auto.sucursalUbicacion;
    this.nAsientos = auto.nAsientos;
    this.tamMaletero = auto.tamMaletero;
    this.complementos = auto.complementos;
    this.costoDia = auto.costoDia;
    this.canDisponible = auto.canDisponible;
    this.estatus = auto.estatus
  }

  // Método para cancelar la actualización del país
  cancelarActualizacionAuto() {
    this.updatingAuto = false;
    this.imagen = '';
    this.tipoAuto = '';
    this.nSerie = '';
    this.marca = '';
    this.mod = '';
    this.sucursalUbicacion = [];
    this.nAsientos = null;
    this.tamMaletero = '';
    this.complementos = '';
    this.costoDia = null;
    this.canDisponible = null;
    this.estatus = '';
    this.autoToUpdate = null;
  }

  // Method to add a new auto
  addAuto(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    if (this.updatingAuto) {
      if (this.autoToUpdate) {
        const updateAuto: Autos = {
          _id: this.autoToUpdate._id,
          imagen: this.imagen,
          tipoAuto: this.tipoAuto,
          nSerie: this.nSerie,
          marca: this.marca,
          mod: this.mod,
          sucursalUbicacion: this.sucursalUbicacion,
          nAsientos: this.nAsientos !== null ? this.nAsientos : 0,
          tamMaletero: this.tamMaletero,
          complementos: this.complementos,
          costoDia: this.costoDia !== null ? this.costoDia : 0,
          canDisponible: this.canDisponible !== null ? this.canDisponible : 0,
          estatus: this.estatus
        };

        this.autosServices.updateAuto(updateAuto).subscribe(
          () => {
            console.log('Auto actualizado correctamente');
            this.cancelarActualizacionAuto();
            this.loadAutos();
          },
          error => {
            console.error('Error al actualizar el auto:', error);
            // Manejar error de actualización si es necesario
          }
        );
      }
    } else {
      const newAuto: Autos = {
        imagen: this.imagen,
        tipoAuto: this.tipoAuto,
        nSerie: this.nSerie,
        marca: this.marca,
        mod: this.mod,
        sucursalUbicacion: this.sucursalUbicacion,
        nAsientos: this.nAsientos !== null ? this.nAsientos : 0,
        tamMaletero: this.tamMaletero,
        complementos: this.complementos,
        costoDia: this.costoDia !== null ? this.costoDia : 0,
        canDisponible: this.canDisponible !== null ? this.canDisponible : 0,
        estatus: this.estatus
      };

      this.autosServices.addAuto(newAuto).subscribe(
        () => {
          console.log('Auto agregado exitosamente');
          this.resetFields();
          this.loadAutos(); // Si necesitas cargar la lista de autos después de agregar uno nuevo
        },
        error => {
          console.error('Error al agregar el auto:', error);
          // Manejar error de agregación si es necesario
        }
      );
    }
  }

  // Method to reset the form fields after adding an auto
  resetFields(): void {
    this.imagen = ''
    this.tipoAuto = '';
    this.nSerie = '';
    this.marca = '';
    this.mod = '';
    this.sucursalUbicacion = [];
    this.nAsientos = null;
    this.tamMaletero = '';
    this.complementos = '';
    this.costoDia = null;
    this.canDisponible = null;
    this.estatus = '';
  }

  addSucursal(): void {
    this.sucursalUbicacion.push('');
}

// Método para eliminar una sucursal
removeSucursal(index: number): void {
    this.sucursalUbicacion.splice(index, 1);
}

deleteAuto(id: string): void {
  this.autosServices.deleteAuto(id)
    .subscribe(() => {
      this.autos = this.autos.filter(auto => auto._id !== id);
    });
}

modelosFiltrados: Modelos[] = []; 

filtrarModelosPorMarca(): void {
  if (this.marca !== '') {
    // Filtrar los modelos por la marca seleccionada
    this.modelosFiltrados = this.modelos.filter(mod => mod.marca === this.marca);
  } else {
    // Si no se selecciona ninguna marca, mostrar todos los modelos
    this.modelosFiltrados = [...this.modelos];
  }
}


}