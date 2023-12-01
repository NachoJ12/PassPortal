import { createContext, useContext, useState, ReactNode } from 'react';
import { SelectChangeEvent } from '@mui/material';

interface CheckoutContextProps {
    selectedValue: {
        regular: string;
        premium: string;
    };
    handleChange: (event: SelectChangeEvent<string>) => void;
}

interface Props {
    children: ReactNode;
}

export const CheckoutContext = createContext<CheckoutContextProps | undefined>(undefined);

export const CheckoutProvider = ({ children }: Props) => {
    const [total, setTotal] = useState<number>(0);

    const [selectedValue, setSelectedValue] = useState({
        regular: "",
        premium: "",
        Premium:"",
        Regular:"",
        VIP:"",
        General:"",
        Palco:"",
        AccesoGeneral:"",
        PlateaAlta:"",
        PlateaBaja:""
    });

    const handleChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        setSelectedValue((prevSelectedValue) => ({
            ...prevSelectedValue,
            [name]: value,
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
