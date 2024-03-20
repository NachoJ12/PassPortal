export interface IMunicipioResponse {
    cantidad: number;
    inicio: number;
    municipios: Municipio[];
    parametros: Parametros;
    total: number;
}

export interface Municipio {
    centroideLat: number;
    centroideLon: number;
    id: string;
    nombre: string;
    provinciaID: string;
    provinciaNombre: string;
}


export interface Parametros {
    aplanar?: boolean;
    max?: number;
    provincia: string;
}