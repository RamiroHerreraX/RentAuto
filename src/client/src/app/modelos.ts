export class Modelos {
    _id?: string;
    marca: string;
    modelo: string;

    constructor(marca: string, modelo: string, _id?: string) {
        this._id = _id;
        this.marca = marca;
        this.modelo = modelo;
    }
}
