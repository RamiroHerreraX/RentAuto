export class Autos {
  _id?: string;
  imagen: string;
  tipoAuto: string;
  nSerie: string;
  marca: string;
  mod: string;
  sucursalUbicacion: string[];;
  nAsientos: number;
  tamMaletero: string;
  complementos: string;
  costoDia: number;
  canDisponible: number; // Add the property here
  estatus: string;

  constructor(imagen: string, tipoAuto: string, nSerie: string, marca: string, mod: string, sucursalUbicacion: string[],
      estatus: string, nAsientos: number, tamMaletero: string, complementos: string, costoDia: number, canDisponible: number, _id?: string) {
          this._id = _id; this.imagen = imagen; this.tipoAuto = tipoAuto; this.nSerie = nSerie; this.marca = marca; this.mod = mod;
          this.sucursalUbicacion = sucursalUbicacion; this.nAsientos = nAsientos; this.tamMaletero = tamMaletero;
          this.complementos = complementos; this.costoDia = costoDia; this.canDisponible = canDisponible; this.estatus = estatus;
      }
}
