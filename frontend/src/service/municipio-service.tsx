import { IMunicipioResponse } from "@/interface/municipio";

const API_GOB = process.env.API_GOB;

//https://apis.datos.gob.ar/georef/api/municipios?provincia=chubut&aplanar&max=89

export const getMunicipiosByProvincia = async (municipio: string) : Promise<IMunicipioResponse> => {
    const res = await fetch(`${API_GOB}/municipios?provincia=${municipio}&aplanar&max=100`)
    return await res.json()
};