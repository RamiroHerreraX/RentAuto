export class Ciudades {
    _id?: string;
    nombreCiudad: string;
    nombreEstado: string;

    constructor(nombreCiudad: string, nombreEstado: string, _id?: string) {
        this._id = _id;
        this.nombreCiudad = nombreCiudad;
        this.nombreEstado = nombreEstado;
    }
}
