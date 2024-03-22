export class Sucursales{
    _id?: String;
    nombrePais?: String;
	nombreEstado?: String;
	nombreCiudad?: String;
	nombreSucursal?: String;
    identificacionSucursal?: String;
    direccion?: String;

    constructor(direccion:String,identificacionSucursal:String,nombreSucursal:String,nombreCiudad: String,nombreEstado: String,nombrePais: String, _id?: String){
        this._id =_id;
        this.nombrePais = nombrePais;
        this.nombreEstado = nombreEstado;
        this.nombreCiudad=nombreCiudad;
        this.nombreSucursal=nombreSucursal;
        this.identificacionSucursal=identificacionSucursal;
        this.direccion=direccion;
    }
}