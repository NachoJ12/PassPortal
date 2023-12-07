import React from "react";
import { useSession } from "next-auth/react";
import { Button, Container, Grid, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { DatePicker, TimePicker } from "antd";
import dayjs from "dayjs";

import logo from "../../../../../public/logo-grey.svg";
import Image from "next/image";

interface EventFormProps {
  onSubmit: (values: any) => void;
}

const CardEventRegister: React.FC<EventFormProps> = ({ onSubmit }) => {
  const { handleSubmit, control } = useForm();
  const { data: session } = useSession(); // Obtén la sesión de NextAuth

  const handleFormSubmit = async (data: any) => {
    
    
    try {
      const apiData = {
        event: {
          name: data.eventName,
          date: data.eventDate,
          time: data.eventTime,
          description: data.eventDescription,
          stock: data.stockEntradas,
          venue: {
            name: data.eventName,
            capacity: data.stockEntradas,
            address: {
              street: data.direccion,
              city: data.municipio,
              country: data.provincia,
            },
          },
          artist: {
            name: data.artista,
          },
          category: {
            id: data.categoria,
          },
        },
        tickets: [
          {
            name: data.tipoTickets,
            price: data.precioTickets,
          },
          {
            name: data.tipoTickets2,
            price: data.precioTickets2,
        }
        ],
      };
      console.log("Datos a enviar:", apiData);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.accessToken}`, // Accede al token de sesión
          },
          body: JSON.stringify(apiData),
        }
      );

      // Verifica si la solicitud fue exitosa (código de respuesta 2xx)
      if (response.ok) {
        const responseData = await response.json();
        console.log("Respuesta de la API:", responseData);
  
        // Llama a la función onSubmit si es necesario
        onSubmit(data);
      } else {
        // Maneja errores de la API aquí
        console.error("Error al enviar datos a la API:", response.statusText);
      }
    } catch (error) {
      // Maneja errores generales aquí
      console.error("Error al enviar datos a la API:", error);
    }
    
  };
  return (
    <>
      <div className="CardEventRegister-general">
        <form
          onSubmit={handleSubmit(handleFormSubmit)} 
          className="CardEventRegister-Form"
        >
          <Container>
            <h1>Registre su evento</h1>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="eventName"
                  control={control}
                  rules={{ required: "Este campo es obligatorio" }}
                  render={({ field }) => (
                    <TextField {...field} label="Nombre del evento" fullWidth required />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="eventDescription"
                  control={control}
                  rules={{ required: "Este campo es obligatorio" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Descripción del evento"
                      multiline
                      fullWidth
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="eventDate"
                  control={control}
                  rules={{ required: "Este campo es obligatorio" }}
                  render={({ field }) => (
                    <DatePicker
                      style={{ width: "100%" }}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="eventTime"
                  control={control}
                  rules={{ required: "Este campo es obligatorio" }}
                  render={({ field }) => (
                    <TimePicker
                      style={{ width: "100%" }}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="provincia"
                  control={control}
                  rules={{ required: "Este campo es obligatorio" }}
                  render={({ field }) => (
                    <TextField {...field} label="Provincia" fullWidth required />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="municipio"
                  control={control}
                  rules={{ required: "Este campo es obligatorio" }}
                  render={({ field }) => (
                    <TextField {...field} label="Municipio" fullWidth required />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="categoria"
                  control={control}
                  rules={{ required: "Este campo es obligatorio" }}
                  render={({ field }) => (
                    <TextField {...field} label="Categoría" fullWidth required type="number" />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="artista"
                  control={control}
                  rules={{ required: "Este campo es obligatorio" }}
                  render={({ field }) => (
                    <TextField {...field} label="Artista" fullWidth required />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="stockEntradas"
                  control={control}
                  rules={{ required: "Este campo es obligatorio" }}
                  render={({ field }) => (
                    <TextField {...field} label="Stock de Entradas" type="number" fullWidth required />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="tipoTickets"
                  control={control}
                  rules={{ required: "Este campo es obligatorio" }}
                  render={({ field }) => (
                    <TextField {...field} label="Tipo de Tickets" fullWidth required />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="precioTickets"
                  control={control}
                  rules={{ required: "Este campo es obligatorio" }}
                  render={({ field }) => (
                    <TextField {...field} label="Precio de Tickets" type="number" fullWidth required />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="tipoTickets2"
                  control={control}
                  rules={{ required: "Este campo es obligatorio" }}
                  render={({ field }) => (
                    <TextField {...field} label="Tipo de Tickets" fullWidth required />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="precioTickets2"
                  control={control}
                  rules={{ required: "Este campo es obligatorio" }}
                  render={({ field }) => (
                    <TextField {...field} label="Precio de Tickets" type="number" fullWidth required />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <input type="file" name="eventImage" required />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Registrar evento
                </Button>
              </Grid>
            </Grid>
          </Container>
        </form>
        <div className="cardEventRegister-logoContainer">
          <Image src={logo} alt="logotipo" className="cardEventRegister-logo" />
        </div>
      </div>
    </>
  );
};

export default CardEventRegister;