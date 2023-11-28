import { StaticImageData } from "next/image";
import imagenPrueba from "../../public/halloween-party-ecuatoriano-215720-min.jpg";
import imagenPrueba1 from "../../public/League-of-Legends-Worlds-2019-cover.jpg"
import imagenPrueba2 from "../../public/crean-beach-1111-287606-min.jpg"
import imagenPrueba3 from "../../public/lova-1111-220410-min.jpg"

interface Event {
    id: string
    title: string
    path: StaticImageData
    description: string
    date: string
    ubication: string
    size: string
}

export const cardItems: Event[] = [
    {
        id: "0",
        title: "League of Legends - Worlds",
        path: imagenPrueba1,
        description:"League of Legends - Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis totam sit officiis at aperiam quae ducimus, ipsam nam quasi voluptatum!",
        date: "november - 2023",
        ubication: "Korea",
        size: "large"
    },
    {
        id: "1",
        title: "Crean Beach 11-11 (+21)",
        path: imagenPrueba2,
        description:
            "coco producciones",
        date: "November 11 - 2023",
        ubication: "Isla La Invernada - Rosario (isla)",
        size: "small"
    },
    {
        id: "2",
        title: "Lova 11/11 (+20)",
        path: imagenPrueba3,
        description:
            "coco producciones",
        date: "November 11 - 2023",
        ubication: "Complejo Forest - Rosario",
        size: "small"
    },
    {
        id: "3",
        title: "HALLOWEEN PARTY ECUATORIANO",
        path: imagenPrueba,
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis temporibus natus nobis blanditiis magnam nam repellat necessitatibus quam nihil error?",
        date: "october 31 - 2023",
        ubication: "Ecuador - Quito",
        size: "small"
    },
    {
        id: "4",
        title: "HALLOWEEN PARTY ECUATORIANO",
        path: imagenPrueba,
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis temporibus natus nobis blanditiis magnam nam repellat necessitatibus quam nihil error?",
        date: "october 31 - 2023",
        ubication: "Ecuador - Quito",
        size: "small"
    },
    {
        id: "5",
        title: "HALLOWEEN PARTY ECUATORIANO",
        path: imagenPrueba,
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis temporibus natus nobis blanditiis magnam nam repellat necessitatibus quam nihil error?",
        date: "october 31 - 2023",
        ubication: "Ecuador - Quito",
        size: "small"
    },
    {
        id: "6",
        title: "HALLOWEEN PARTY ECUATORIANO",
        path: imagenPrueba,
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis temporibus natus nobis blanditiis magnam nam repellat necessitatibus quam nihil error?",
        date: "october 31 - 2023",
        ubication: "Ecuador - Quito",
        size: "small"
    },
    {
        id: "7",
        title: "HALLOWEEN PARTY ECUATORIANO",
        path: imagenPrueba,
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis temporibus natus nobis blanditiis magnam nam repellat necessitatibus quam nihil error?",
        date: "october 31 - 2023",
        ubication: "Ecuador - Quito",
        size: "small"
    },
    {
        id: "8",
        title: "HALLOWEEN PARTY ECUATORIANO",
        path: imagenPrueba,
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis temporibus natus nobis blanditiis magnam nam repellat necessitatibus quam nihil error?",
        date: "october 31 - 2023",
        ubication: "Ecuador - Quito",
        size: "small"
    },
    {
        id: "9",
        title: "HALLOWEEN PARTY ECUATORIANO",
        path: imagenPrueba,
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis temporibus natus nobis blanditiis magnam nam repellat necessitatibus quam nihil error?",
        date: "october 31 - 2023",
        ubication: "Ecuador - Quito",
        size: "small"
    },
    {
        id: "10",
        title: "HALLOWEEN PARTY ECUATORIANO",
        path: imagenPrueba,
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis temporibus natus nobis blanditiis magnam nam repellat necessitatibus quam nihil error?",
        date: "october 31 - 2023",
        ubication: "Ecuador - Quito",
        size: "small"
        
    },
    {
        id: "11",
        title: "HALLOWEEN PARTY ECUATORIANO",
        path: imagenPrueba,
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis temporibus natus nobis blanditiis magnam nam repellat necessitatibus quam nihil error?",
        date: "october 31 - 2023",
        ubication: "Ecuador - Quito",
        size: "small"
    },
];