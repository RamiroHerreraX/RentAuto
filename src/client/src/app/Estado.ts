export class Estados {
    _id?: string;
    nombreEstado: string;
    nombrePais: string;

    constructor(nombrePais: string, nombreEstado: string, _id?: string) {
        this._id = _id;
        this.nombreEstado = nombreEstado;
        this.nombrePais = nombrePais;
        
    }
}
