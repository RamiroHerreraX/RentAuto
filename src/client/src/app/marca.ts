export class Marcas {
    _id?: string;
    marca: string;

    constructor(marca: string, _id?: string) {
        this._id = _id;
        this.marca = marca;
    }
}