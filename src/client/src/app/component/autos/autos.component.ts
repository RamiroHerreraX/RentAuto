// autos.component.ts
import { Component, OnInit } from '@angular/core';
import { AutosService } from '../../services/autos.service';
import { Auto } from '../../autos';
//import { ToastrService } from 'ngx-toastr';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { AutoModel } from '../../models/datosPModel'

@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html',
  styleUrls: ['./autos.component.css']
})
export class AutosComponent implements OnInit {
  auto: Auto[] = [];
  autosFiltrados: Auto[] = [];

  constructor(private autosService: AutosService) { }

  ngOnInit(): void {
    this.obtenerDatosAutos();
  }

  obtenerDatosAutos() {
    this.autosService.getAutos().subscribe(
      data => {
        this.auto = data;
        this.autosFiltrados = [...this.auto];
      },
      error => {
        console.error('Error al cargar datos de autos:', error);
      }
    );
  }
  filtrarPorCategoria(categoria: string) {
    this.autosFiltrados = this.auto.filter(auto => auto.categoria === categoria);
  }
}
