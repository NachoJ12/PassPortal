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
    1: number,
    2: number,
    3: number,
    4: number,
    5: number,
    6: number,
    7: number,
    8: number,
    9: number,
    10: number,
    // Add more ticket types as needed
}



export type SelectedValue = [{
    id: number
}]