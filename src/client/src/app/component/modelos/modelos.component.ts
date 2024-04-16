import { Component, OnInit } from '@angular/core';
import { Marcas } from '../../marca';
import { Modelos } from '../../modelos';
import { MarcasService } from '../../services/marcas.service';
import { ModelosService } from '../../services/modelos.service';

@Component({
  selector: 'app-modelos',
  templateUrl: './modelos.component.html',
  styleUrls: ['./modelos.component.css']
})
export class ModelosComponent implements OnInit {
  modelos: Modelos[] = [];
  marcas: Marcas[] =[];
  marc: Marcas[] =[];
  marca: string = '';
  modelo: string = '';

  constructor(private modelosServices: ModelosService, private marcasServices: MarcasService) { }

  ngOnInit(): void {
    this.loadModelos();
    this.loadMarcas();
    this.loadMarcas1();
  }

  loadModelos(): void {
    this.modelosServices.getModelos()
      .subscribe(data => {
        this.modelos = data;
      });
  }

  loadMarcas1(): void {
    this.marcasServices.getMarcas()
      .subscribe(data3 => {
        this.marc = data3;
      });
  }

  updatingModelo: boolean = false;
  modeloToUpdate: Modelos | null = null; // Variable para almacenar el país que se está actualizando

  // Método para cargar el país seleccionado para actualizar
  cargarModeloSeleccionado(modelo: Modelos) {
    this.updatingModelo = true;
    this.modeloToUpdate = modelo;
    this.modelo = modelo.modelo;
    this.marca = modelo.marca;
  }

  // Método para cancelar la actualización del país
  cancelarActualizacionModelo() {
    this.updatingModelo = false;
    this.marca = '';
    this.modelo = '';
    this.modeloToUpdate = null;
  }

  // Método para agregar o actualizar el país
  addModelo(event: { preventDefault: () => void; }): void {
    event.preventDefault();
    if (this.updatingModelo) {
      // Lógica para actualizar el país
      if (this.modeloToUpdate) {
        const updateModelo: Modelos = {
          _id: this.modeloToUpdate._id,
          modelo: this.modelo,
          marca: this.marca
        };
        this.modelosServices.updateModelo(updateModelo).subscribe(
          () => {
            console.log('Modelo actualizado correctamente');
            this.cancelarActualizacionModelo(); // Restablecer el estado de actualización después de la actualización exitosa
            // Actualizar la lista de países después de la actualización exitosa
            this.loadModelos();
          },
          error => {
            console.error('Error al actualizar el modelo:', error);
            // Aquí puedes manejar el error de actualización si es necesario
          }
        );
      }
    } else {
      // Lógica para agregar un nuevo país
      const newModelo: Modelos = {
        modelo: this.modelo,
        marca: this.marca
      };
      this.modelosServices.addModelo(newModelo)
        .subscribe(modelo => {
          this.modelos.push(modelo); // Asumiendo que tienes una lista llamada paises donde se almacenan los países
          this.marca = ''; // Limpiar el campo de entrada después de agregar el país
          this.modelo = '';
        });
    }
  }

  deleteModelo(id: string): void {
    this.modelosServices.deleteModelo(id)
      .subscribe(() => {
        this.modelos = this.modelos.filter(modelo => modelo._id !== id);
      });
  }


  // MARCAS
  loadMarcas(): void {
    this.marcasServices.getMarcas()
      .subscribe(data2 => {
        this.marcas = data2;
      });
  }

  updatingMarca: boolean = false;
  marcaToUpdate: Marcas | null = null; // Variable para almacenar el país que se está actualizando

  // Método para cargar el país seleccionado para actualizar
  cargarMarcaSeleccionada(marca: Marcas) {
    this.updatingMarca = true;
    this.marcaToUpdate = marca;
    this.marca = marca.marca;
  }

  // Método para cancelar la actualización del país
  cancelarActualizaciobMarca() {
    this.updatingMarca = false;
    this.marca = '';
    this.marcaToUpdate = null;
  }

  addMarca(event: { preventDefault: () => void; }): void {
    event.preventDefault();
    if (this.updatingMarca) {
      // Lógica para actualizar la marca
      if (this.marcaToUpdate) {
        const updateMarca: Marcas = {
          _id: this.marcaToUpdate._id,
          marca: this.marca
        };
        this.marcasServices.updateMarca(updateMarca).subscribe(
          () => {
            console.log('Marca actualizada correctamente');
            this.cancelarActualizaciobMarca(); // Restablecer el estado de actualización después de la actualización exitosa
            this.loadMarcas();
          },
          error => {
            console.error('Error al actualizar la marca:', error);
            // Aquí puedes manejar el error de actualización si es necesario
          }
        );
      }
    } else {
      // Lógica para agregar una nueva marca
      const newMarca: Marcas = {
        marca: this.marca
      };
      this.marcasServices.addMarca(newMarca)
        .subscribe(marca => {
          this.marcas.push(marca); // Asumiendo que tienes una lista llamada marcas donde se almacenan las marcas
          this.marca = ''; // Limpiar el campo de entrada después de agregar la marca
        });
    }
  }
  

  deleteMarca(id: string): void {
    this.marcasServices.deleteMarca(id)
      .subscribe(() => {
        this.marcas = this.marcas.filter(marca => marca._id !== id);
      });
  }

  filtroModelo: string = ''; // Variable para almacenar el país seleccionado para filtrar los estados
  modelosFiltrados: Modelos[] = []; // Variable para almacenar los estados filtrados

  // Método para filtrar los modelos por marca
  filtrarModelos() {
    if (this.filtroModelo === '') {
      // Si no hay ninguna marca seleccionada, no aplicar filtrado
      this.modelosFiltrados = [];
    } else {
      // Filtrar los modelos por la marca seleccionada
      this.modelosFiltrados = this.modelos.filter(modelo => modelo.marca === this.filtroModelo);
    }
  }

  //filtroMarca: string = ''; // Variable para almacenar el país seleccionado para filtrar los estados
  //marcasFiltradas: Modelos[] = []; // Variable para almacenar los estados filtrados

  // Método para filtrar los modelos por marca
  //filtrarMar() {
    //if (this.filtroMarca === '') {
      // Si no hay ninguna marca seleccionada, no aplicar filtrado
      //this.marcasFiltradas = [];
    //} else {
      // Filtrar las marcas por los modelos seleccionados
      //this.marcasFiltradas = this.modelos.filter(marca => marca.modelo === this.filtroMarca);
    //}
  //}
}
