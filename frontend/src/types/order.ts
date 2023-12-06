export interface IOder {
    deliveryAddress: string;
    userid: number;
    ticket: Ticket[];
}

interface Ticket {
    id: number;
}
