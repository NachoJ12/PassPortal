export interface IOrder {
    deliveryAddress: string;
    userid: number;
    tickets: TicketOrder[];
}

interface TicketOrder {
    id: number;
}
