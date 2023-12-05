import { createContext, useContext, useState, ReactNode } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { TicketType } from '@/types/events';

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

    const [selectedValue, setSelectedValue] = useState<TicketType>({
        regular: 0,
        premium: 0,
        Regular: 0,
        Premium: 0,
        VIP: 0,
        General: 0,
        Palco: 0,
        AccesoGeneral: 0,
        PlateaAlta: 0,
        PlateaBaja: 0,
    });


    const handleChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target // Assuming the value matches the TicketType enum
        setSelectedValue(prevState => ({
            ...prevState,
                [name]: value
        }));
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
