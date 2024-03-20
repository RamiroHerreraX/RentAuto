import { Component, OnInit } from '@angular/core';
import { Ciudades } from '../../Ciudades';
import { Estados } from '../../Estado';
import { CiudadesService } from '../../services/ciudades.service';
import { EstadosService } from '../../services/estados.service';
import { Paises } from '../../Paises';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.component.html',
  styleUrls: ['./ciudad.component.css']
})
export class CiudadComponent implements OnInit {
  mostrarFormularioPaises: boolean = false;
  mostrarFormularioEstado: boolean = false;
  mostrarFormularioCiudad: boolean = false;
  paises: Paises[] = [];
  estados: Estados[] = [];
  ciudades: Ciudades[] = [];
  pais: string = '';
  pais2: string = '';
  ordenAscendente: boolean = true; // Variable para controlar el orden ascendente o descendente
  ciudad: string = ''; // Propiedad para la ciudad
  estado: string = ''; // Propiedad para el estado
  estado2: string = '';

  constructor(private paisesService: PaisesService, private ciudadesService: CiudadesService, private estadosService: EstadosService) { }

  ngOnInit(): void {
    this.loadPaises();
    this.loadEstados();
    this.loadCiudades();
  }

  loadPaises(): void {
    this.paisesService.getPaises()
      .subscribe(data => {
        this.paises = data;
      });
  }

  loadEstados(): void {
    this.estadosService.getEstados()
      .subscribe(data2 => {
        this.estados = data2;
      });
  }

  loadCiudades(): void {
    this.ciudadesService.getCiudades()
      .subscribe(data3 => {
        this.ciudades = data3;
      });
  }

  //pais
  addPais(event: { preventDefault: () => void; }): void {
    event.preventDefault();
    const newPais: Paises = {
      nombrePais: this.pais
    };
    this.paisesService.addPais(newPais)
      .subscribe(pais => {
        this.paises.push(pais);
        this.pais = '';
      });
  }

  deletePais(id: string): void {
    this.paisesService.deletePais(id)
      .subscribe(() => {
        this.paises = this.paises.filter(pais => pais._id !== id);
      });
  }

  toggleOrder(): void {
    this.ordenAscendente = !this.ordenAscendente; // Cambiar el orden
    this.paises.sort((a, b) => {
      if (this.ordenAscendente) {
        return a.nombrePais.localeCompare(b.nombrePais.toString()); // Orden ascendente
      } else {
        return b.nombrePais.localeCompare(a.nombrePais.toString()); // Orden descendente
      }
    });
  }

  ordenAscendenteEstados: boolean = true; // Variable para controlar el orden ascendente o descendente

  toggleOrderEstados(): void {
    this.ordenAscendenteEstados = !this.ordenAscendenteEstados; // Cambiar el orden
    this.estados.sort((a, b) => {
      if (this.ordenAscendenteEstados) {
        return a.nombreEstado.localeCompare(b.nombreEstado.toString()); // Orden ascendente
      } else {
        return b.nombreEstado.localeCompare(a.nombreEstado.toString()); // Orden descendente
      }
    });
    this.filtrarCiudades(); // Aplicar el filtrado después de la ordenación
  }
  

  ordenAscendentePaises: boolean = true; // Variable para controlar el orden ascendente o descendente

  toggleOrderPaises(): void {
    this.ordenAscendentePaises = !this.ordenAscendentePaises; // Cambiar el orden
    this.estados.sort((a, b) => {
      if (this.ordenAscendentePaises) {
        return a.nombrePais.localeCompare(b.nombrePais.toString()); // Orden ascendente
      } else {
        return b.nombrePais.localeCompare(a.nombrePais.toString()); // Orden descendente
      }
    });
    this.filtrarCiudades(); // Aplicar el filtrado después de la ordenación
  }

  toggleFormularioCiudad(): void {
    this.mostrarFormularioCiudad = !this.mostrarFormularioCiudad;
  }

  toggleFormularioPaises(): void {
    this.mostrarFormularioPaises = !this.mostrarFormularioPaises;
  }

  toggleFormularioEstado(): void {
    this.mostrarFormularioEstado = !this.mostrarFormularioEstado;
  }

  //estado
  addEstado(event: { preventDefault: () => void; }): void {
    event.preventDefault();
    const newEstado: Estados = new Estados(this.pais2, this.estado); // Crear una nueva instancia de la clase Estados con los datos proporcionados
    this.estadosService.addEstado(newEstado)
      .subscribe(estado => {
        this.estados.push(estado); // Asumiendo que tienes una lista llamada paises donde se almacenan los estados
        this.pais2 = ''; // Limpiar el campo de entrada después de agregar el estado
        this.estado = ''; // Limpiar el campo de entrada del estado después de agregar el estado
      });
  }

  deleteEstado(_id: string): void {
    this.estadosService.deleteEstado(_id)
      .subscribe(() => {
        this.estados = this.estados.filter(estado => estado._id !== _id);
      });
  }

  updateEstado(estado: Estados): void {
    const updatedEstado: Estados = {
      _id: estado._id,
      nombreEstado: estado.nombreEstado,
      nombrePais: estado.nombrePais
    };

    this.estadosService.updateEstado(updatedEstado).subscribe(
      () => {
        console.log('Estado actualizado correctamente');
        // Actualizar la lista de estados después de la actualización exitosa
        this.loadEstados();
      },
      error => {
        console.error('Error al actualizar el estado:', error);
        // Aquí puedes manejar el error de actualización si es necesario
      }
    );
  }
  
  cargarEstadoSeleccionado(estado: Estados): void {
    // Asignar los valores a los campos de texto del formulario de actualización
    this.estado = estado.nombreEstado;
    this.pais2 = estado.nombrePais;
  }
  
    //Ciudades
    addCiudad(event: { preventDefault: () => void; }): void {
      event.preventDefault();
      const newCiudad: Ciudades = {
        nombreCiudad: this.ciudad,
        nombreEstado: this.estado2 // Asignar el nombre del estado seleccionado
      };
      this.ciudadesService.addCiudad(newCiudad)
        .subscribe(ciudad => {
          this.ciudades.push(ciudad); // Agregar la nueva ciudad a la lista de ciudades
          this.ciudad = ''; // Limpiar el campo de entrada después de agregar la ciudad
        });
    }

    deleteCiudad(_id: string): void {
      this.ciudadesService.deleteCiudad(_id)
        .subscribe(() => {
          this.ciudades = this.ciudades.filter(ciudad => ciudad._id !== _id);
        });
    }
    
    filtroPais: string = ''; // Variable para almacenar el país seleccionado para filtrar los estados
    estadosFiltrados: any[] = []; // Variable para almacenar los estados filtrados
  
    // Método para filtrar los estados por país
    filtrarEstados() {
      if (this.filtroPais === '') {
        // Si no hay ningún país seleccionado, no aplicar filtrado
        this.estadosFiltrados = [];
      } else {
        // Filtrar los estados por el país seleccionado
        this.estadosFiltrados = this.estados.filter(estado => estado.nombrePais === this.filtroPais);
      }
    }
    
    filtroEstado: string = ''; // Variable para almacenar el país seleccionado para filtrar los estados
    ciudadesFiltradas: any[] = []; // Variable para almacenar los estados filtrados

    filtrarCiudades() {
      if (this.filtroEstado === '') {
        // Si no hay ningún país seleccionado, mostrar todos los estados
        this.ciudadesFiltradas = this.ciudades;
      } else {
        // Filtrar los estados por el país seleccionado
        this.ciudadesFiltradas = this.ciudades.filter(ciudades => ciudades.nombreEstado === this.filtroEstado);
      }
    }

}
