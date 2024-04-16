import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SucursalesService } from '../../services/sucursales.service';
//import { ReservasService } from 'src/app/services/reserva.service';
//import { EnviaDatosService } from 'src/app/services/enviadatos.service';
//import { ReservaLugarModel } from 'src/app/models/datosPModel';
import { Router } from '@angular/router';
import { Subscriber, subscribeOn } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {
  reservaForm: FormGroup;
  //reserva: ReservaLugarModel[]=[];
  lugares: any[] = [];
  cuponesDescuento: { [key: string]: number } = {
    TORRES12: 0.1, // 10% 
    EQUIPO1: 0.15, // 15% 
  };
  descuentoAplicado: number = 0; 
  isAuth :boolean = false;
  currentDate!: string;

  constructor(
    private fb: FormBuilder,
    private sucursalesService: SucursalesService,
    //private toastrService: ToastrService,
    //private enviaDatosService: EnviaDatosService,
    //public auth: AuthService,
    private router:Router
  ) {
    

    this.reservaForm = this.fb.group({
      lugarS: ['',Validators.required],
      fechasS: ['',Validators.required],
      horasS: ['',Validators.required],
      lugarE: ['',Validators.required],
      fechasE: ['',Validators.required],
      horasE: ['',Validators.required],
      usarCupon: [false],
      descuento: ['', Validators.pattern('^(0\.1|0\.15)$')]
    });
  }

  ngOnInit(): void {
    /*
    this.auth.isAuthenticated$.subscribe(isAuthenticated =>{
      if(isAuthenticated){
        this.router.navigate(['/home-admin'])
        this.isAuth = true;
        console.log(isAuthenticated)
      } else 
        {
          this.router.navigate(['/home'])
          this.isAuth = false;
          console.log(isAuthenticated)
        }
    })

    this.cargarLugares();
    this.enviaDatosService.reserva$.subscribe((reserva: ReservaLugarModel) => {
      console.log('Reserva seleccionado en el componente de reserva:', reserva);
    });

    //fecha
    const dateObj = new Date();
    this.currentDate = this.formatDate(dateObj);
    */
}

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  
  login() {
    // Redirige al usuario a la página de inicio de sesión
    this.router.navigateByUrl('/login');
}
  onSubmit() {
 // Asignar el descuento al campo del cupón
 const descuentoControl = this.reservaForm.get('descuento');
  if (descuentoControl) {
    const codigoCupon = descuentoControl.value;

    // Verificar si se ingresó un código de cupón y si es válido
    if (codigoCupon) {
      if (!this.cuponesDescuento.hasOwnProperty(codigoCupon)) {
        //this.toastrService.error('El código de cupón ingresado no es válido.', 'Error');
        return;
      } else {
        const descuento = this.cuponesDescuento[codigoCupon];
        this.reservaForm.patchValue({ descuento: descuento });
      }
    }
  } else {
    //this.toastrService.error('Por favor, ingrese un código de cupón válido.', 'Error');
    return;
  }

 

    /*const reserva: ReservaLugarModel = {
      lugarS: this.reservaForm.get('lugarS')?.value,
      fechasS: this.reservaForm.get('fechasS')?.value,
      horasS: this.reservaForm.get('horasS')?.value,
      lugarE: this.reservaForm.get('lugarE')?.value,
      fechasE: this.reservaForm.get('fechasE')?.value,
      horasE: this.reservaForm.get('horasE')?.value,
      descuento: this.reservaForm.get('descuento')?.value,
    };
    this.onClick(reserva);
   */ 

    // Verificaciones
    //Campos vacios
   for (const controlName in this.reservaForm.controls) {
    // Excluir el campo de descuento de la validación
    if (controlName === 'descuento') {
      continue;
    }

    const control = this.reservaForm.get(controlName);
    if (control && control.value === '') {
      //this.toastrService.error('Por favor, complete todos los campos de reserva.', 'Error');
      return; 
    }
  }

    // Fechas
    const fechaSalida = new Date(this.reservaForm.value.fechasS + 'T' + this.reservaForm.value.horasS);
    const fechaEntrega = new Date(this.reservaForm.value.fechasE + 'T' + this.reservaForm.value.horasE);

    if (fechaSalida >= fechaEntrega) {
      //this.toastrService.error('La fecha de salida debe ser anterior a la fecha de entrega.', 'Error');
      return;   
    }

    // Horas
    if (fechaSalida.toDateString() === fechaEntrega.toDateString() && this.reservaForm.value.horasS >= this.reservaForm.value.horasE) {
      //this.toastrService.error('La hora de salida debe ser anterior a la hora de entrega.', 'Error');
      return;
    }
    this.router.navigate(['/user/autos']);

  }
/*
  onClick(reserva: ReservaLugarModel): void {
    this.enviaDatosService.setReserva(reserva);
    console.log('Reserva enviada:', reserva);
  }

  cargarLugares(): void {
    this.sucursalesService.getLugars().subscribe(
      data => {
        this.lugares = data;
        console.log('Lugares cargados:', this.lugares);
      },
      error => {
        console.error('Error al cargar lugares:', error);
      }
    );
  }*/
}
