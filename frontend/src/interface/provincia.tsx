export interface IProvinciaResponse {
    cantidad:   number;
    inicio:     number;
    parametros: Parametros;
    provincias: Provincia[];
    total:      number;
}

export interface Parametros {
    aplanar?: boolean;
    max?: number;
}

export interface Provincia {
    centroideLat: number;
    centroideLon: number;
    id:           string;
    nombre:       string;
}