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

export interface ISingleEvent {
    name: string;
    date: string;
    time: string;
    description: string;
    stock: number;
    venue: Venue;
    artist: Artist;
    category: Category;
}

export interface Ticket {
    name: string;
    price: number;
}