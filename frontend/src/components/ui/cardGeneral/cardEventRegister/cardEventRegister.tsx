import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Button, Container, Grid, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import toastr from "toastr"; // Importa Toastr
import "toastr/build/toastr.min.css";

import logo from "../../../../../public/logo-grey.svg";
import Image from "next/image";

interface EventFormProps {
  onSubmit: (values: any) => void;
}

const CardEventRegister: React.FC<EventFormProps> = ({ onSubmit }) => {
  const { handleSubmit, control } = useForm();
  const { data: session } = useSession();
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleFormSubmit = async (data: any) => {
    try {
      const formattedDate = dayjs(data.eventDate).format("YYYY-MM-DD");
      const formattedTime = dayjs(data.eventTime).format("HH:mm:ss");
  
      const apiData = {
        event: {
          name: data.eventName,
          date: formattedDate,
          time: formattedTime,
          description: data.eventDescription,
          stock: parseInt(data.stockEntradas),
          venue: {
            name: data.eventName,
            capacity: parseInt(data.stockEntradas),
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
            id: parseInt(data.categoria),
          },
        },
        tickets: [
          {
            name: data.tipoTickets,
            price: parseFloat(data.precioTickets),
          },
          {
            name: data.tipoTickets2,
            price: parseFloat(data.precioTickets2),
          },
        ],
      };
  
      const formData = new FormData();
  
      // Adjuntar archivo si está presente
      if (file) {
        formData.append("file", file);
      }
  
      // Convertir datos a formato JSON y adjuntarlos
      formData.append(
        "data",
        new Blob([JSON.stringify(apiData)], {
          type: "application/json",
        })
      );
  
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/events`,
        {
          method: "POST",
          body: formData,
        }
      );
  
      if (response.ok) {
        const responseData = await response.json();
        console.log("Respuesta de la API:", responseData);

        toastr.options = {
          closeButton: false,
          debug: false,
          newestOnTop: false,
          progressBar: false,
          positionClass: "toast-top-right",
          preventDuplicates: false,
          showEasing: "swing",
          hideEasing: "linear",
          showMethod: "fadeIn",
          hideMethod: "fadeOut",
        };
        toastr.success("El evento se ha creado exitosamente!");
  
        // Llama a la función onSubmit si es necesario
        onSubmit(data);
      } else {
        console.error("Error al enviar datos a la API:", response.statusText);
      }
    } catch (error) {
      console.error("Error en el servidor:", error);

      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-top-right",
        preventDuplicates: false,
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };

      toastr.error("Error al crear el evento.");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                      <TextField
                        {...field}
                        label="Nombre del evento"
                        fullWidth
                        required
                      />
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
                        {...field}
                        label="Fecha del evento"
                        value={field.value || null}
                        className="datePicker"
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
                        {...field}
                        label="Hora del evento"
                        value={field.value || null}
                        className="timePicker"
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
                      <TextField
                        {...field}
                        label="Provincia"
                        fullWidth
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="municipio"
                    control={control}
                    rules={{ required: "Este campo es obligatorio" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Municipio"
                        fullWidth
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="direccion"
                    control={control}
                    rules={{ required: "Este campo es obligatorio" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Dirección"
                        fullWidth
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="categoria"
                    control={control}
                    rules={{ required: "Este campo es obligatorio" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Categoría"
                        fullWidth
                        required
                        type="number"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="artista"
                    control={control}
                    rules={{ required: "Este campo es obligatorio" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Artista"
                        fullWidth
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="stockEntradas"
                    control={control}
                    rules={{ required: "Este campo es obligatorio" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Stock de Entradas"
                        type="number"
                        fullWidth
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="tipoTickets"
                    control={control}
                    rules={{ required: "Este campo es obligatorio" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Tipo de Tickets"
                        fullWidth
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="precioTickets"
                    control={control}
                    rules={{ required: "Este campo es obligatorio" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Precio de Tickets"
                        type="number"
                        fullWidth
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="tipoTickets2"
                    control={control}
                    rules={{ required: "Este campo es obligatorio" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Tipo de Tickets"
                        fullWidth
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="precioTickets2"
                    control={control}
                    rules={{ required: "Este campo es obligatorio" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Precio de Tickets"
                        type="number"
                        fullWidth
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <input type="file" onChange={handleFileChange} />
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
            <Image
              src={logo}
              alt="logotipo"
              className="cardEventRegister-logo"
            />
          </div>
        </div>
      </>
    </LocalizationProvider>
  );
};

export default CardEventRegister;
