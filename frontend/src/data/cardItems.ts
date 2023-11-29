import { StaticImageData } from "next/image";
import imagenPrueba from "../../public/halloween-party-ecuatoriano-215720-min.jpg";
import imagenPrueba1 from "../../public/League-of-Legends-Worlds-2019-cover.jpg"
import imagenPrueba2 from "../../public/crean-beach-1111-287606-min.jpg"
import imagenPrueba3 from "../../public/lova-1111-220410-min.jpg"
import { Event } from "@/types/events";


export const events: Event[] = [];

for (let i = 1; i <= 12; i++) {
    events.push({
        name: `Evento ${i}`,
        date: `2023-11-${i < 10 ? '0' + i : i}`,
        time: '18:00:00',
        description: `Descripcion evento${i}`,
        stock: 7000,
        image: 'xxx',
        venue: {
            name: 'Teatro Colon',
            capacity: 25000,
            image: 'xxx',
            address: {
                street: 'Calle falsa',
                city: 'Buenos Aires',
                country: 'Argentina',
                id: 1
            },
            id: 1
        },
        category: {
            name: 'Categoria 1',
            description: 'descripcion category1',
            image: 'xxx',
            id: 1
        },
        artist: {
            name: 'Ricardo',
            id: 1
        },
        id: i
    });
}