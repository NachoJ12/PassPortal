import { createContext, useContext, useState, ReactNode } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { TicketType } from '@/types/events';
import { IOrder } from '@/types/order';

interface CheckoutContextProps {
    selectedValue: TicketType
    handleChange: (event: SelectChangeEvent<string>) => void;
}

interface Props {
    children: ReactNode;
}

export const CheckoutContext = createContext<CheckoutContextProps | undefined>(undefined);

export const CheckoutProvider = ({ children }: Props) => {
    const [total, setTotal] = useState<number>(0);

    const [order, setOrder] = useState<IOrder>({
        deliveryAddress: "",
        userid: 0,
        tickets: [{id:0}],
    })

    const [selectedValue, setSelectedValue] = useState<TicketType>({
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
    });



    const handleChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target
        setSelectedValue(prevState => ({
            ...prevState,
            [name]: value
        }));
        setOrder(prevState => ({
            ...prevState, 
            
        }))
    };

    const contextValue: CheckoutContextProps = {
        selectedValue,
        handleChange,
    };

    return (
        <CheckoutContext.Provider value={contextValue}>
            {children}
        </CheckoutContext.Provider>
    );
};
