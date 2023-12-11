import { createContext, useState, ReactNode } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { TicketType } from '@/types/events';
import { IOrder, TicketOrder } from '@/types/order';
import { timePickerToolbarClasses } from '@mui/x-date-pickers';

interface CheckoutContextProps {
    selectedValue: TicketType
    handleChange: (event: SelectChangeEvent<string>) => void;
    ticket: TicketOrder[];
    total: number;
    handleTotal: (price : number) => void 
}

interface Props {
    children: ReactNode;
}

export const CheckoutContext = createContext<CheckoutContextProps | undefined>(undefined);

export const CheckoutProvider = ({ children }: Props) => {
    const [total, setTotal] = useState<number>(0);

    const handleTotal = (price : number) => setTotal(price)

    const [selectedValue, setSelectedValue] = useState<TicketType>({
        regular: 0,
        premium: 0,
        Premium: 0,
        Regular: 0,
        VIP: 0,
        General: 0,
        Palco: 0,
        AccesoGeneral: 0,
        PlateaAlta: 0,
        PlateaBaja: 0
    });


    const [ticket, setTicket] = useState<TicketOrder[]>([])


    const handleChange = (event: SelectChangeEvent<string>) => {
        const { name, value, } = event.target
        const cleanName = name.split("-")[0]
        setSelectedValue(prevState => ({
            ...prevState,
            [cleanName]: value
        }));

        const existingTicketIndex = ticket.findIndex(t => t.name === cleanName);

        if (existingTicketIndex !== -1) {
            const updatedTickets = [...ticket];
            updatedTickets[existingTicketIndex] = {
                ...updatedTickets[existingTicketIndex],
                cantTickets: Number(value),
            };
            setTicket(updatedTickets);
        } else {
            // Add a new ticket to the array
            setTicket(prevTickets => [
                ...prevTickets,
                {
                    id: Number(name.split("-")[1]),
                    name: cleanName as string,
                    cantTickets: Number(value),
                },
            ]);
        }
    }

    const contextValue: CheckoutContextProps = {
        selectedValue,
        handleChange,
        ticket,
        handleTotal,
        total
    };

    return (
        <CheckoutContext.Provider value={contextValue}>
            {children}
        </CheckoutContext.Provider>
    );
};
