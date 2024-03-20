export class Paises{
    _id?: String;
    nombrePais: String;

    constructor(nombrePais: String, _id?: String){
        this._id =_id;
        this.nombrePais = nombrePais;
    }
}