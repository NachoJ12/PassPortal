import React, { useState, ReactNode, FC, useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Select, createTheme, MenuItem } from '@mui/material';
import { CheckoutContext } from '@/components/context/checkout-context';
import { Ticket, TicketType } from '@/types/events';


const theme = createTheme({
    palette: {
        primary: {
            light: '#E5C0D9',
            main: '#cb74a8',
            dark: '#b3437d',
            contrastText: '#fff',
        },
    },
})

interface Props {
    tickets: Ticket[]
}

export default function PaymentTable({ tickets }: Props) {

    const context = useContext(CheckoutContext);

    const { selectedValue, handleChange = () => { } } = context || {};

    console.log(selectedValue)

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 350 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Type of tickect</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right"> Amount </TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {tickets.map((row: Ticket) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right"> {"$" + row.price}</TableCell>
                            <TableCell align="right">
                                <div>
                                    <Select
                                        defaultValue="0"
                                        labelId='select-label'
                                        id='select'
                                        name={row.id.toString() }
                                        label='Choose'
                                        onChange={handleChange}
                                        sx={{
                                            '& fieldset': {
                                                borderColor: '#cb74a8 !important', // Cambia "your-desired-color" al color que desees
                                            },
                                            width: '50% !important',
                                            color: 'white !important',
                                        }}
                                    >
                                        <MenuItem value='0'>0</MenuItem>
                                        <MenuItem value='1'>1</MenuItem>
                                        <MenuItem value='2'>2</MenuItem>
                                        <MenuItem value='3'>3</MenuItem>
                                        <MenuItem value='4'>4</MenuItem>
                                        <MenuItem value='5'>5</MenuItem>
                                    </Select>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}