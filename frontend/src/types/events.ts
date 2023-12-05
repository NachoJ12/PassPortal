import { Category } from "./categories";

export interface Event {
    name: string;
    date: string;
    time: string;
    description: string;
    stock: number;
    image: string;
    venue: Venue;
    category: Category;
    artist: Artist;
    id: number;
}

export interface Venue {
    name: string;
    capacity: number;
    image: string;
    address: Address;
    id: number;
}

export interface Address {
    street: string;
    city: string;
    country: string;
    id: number;
}

export interface Artist {
    name: string;
    id: number;
}


export interface SingleEvent {
    event: Event;
    tickets: Ticket[];
}

export interface Ticket {
    id: number;
    name: string;
    price: number;
    eventid: number;
}


export type TicketType = {
    regular : number,
    premium : number,
    Regular : number,
    Premium : number,
    VIP : number,
    General : number,
    Palco : number,
    AccesoGeneral : number,
    PlateaAlta : number,
    PlateaBaja : number,
    // Add more ticket types as needed
}