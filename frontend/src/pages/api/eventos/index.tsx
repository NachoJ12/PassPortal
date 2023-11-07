import { NextApiRequest, NextApiResponse } from 'next'
import { cardItems, Event } from '@/data/cardItems';

type Data = Event[] | Event | { message: string }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    // Consultar el method de la petición si es get enviamos los datos de lo contrario enviamos un mensaje de error
    if (req.method === "GET") {
        const { id } = req.query; // Obtén el ID del parámetro de ruta

        if (id) {
            // Si se proporciona un ID, busca y devuelve el cardItem correspondiente
            const cardItem = cardItems[Number(id)];
            if (cardItem) {
                res.status(200).json(cardItem);
            } else {
                res.status(404).json({ message: "No se encontró el elemento" });
            }
        } else {
            // Si no se proporciona un ID, devuelve todos los cardItems
            res.status(200).json(Object.values(cardItems));
        }
    } else {
        res.status(405).json({ message: "Método no permitido" });
    }

}