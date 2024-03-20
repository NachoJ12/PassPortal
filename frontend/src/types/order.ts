export interface IOrder {
    emailAddress: string;
    userId: number;
    eventId: number;
    tickets: TicketOrder[];
    totalPrice: number
}

export interface TicketOrder {
    id: number;
    name: string;
    cantTickets : number
}
