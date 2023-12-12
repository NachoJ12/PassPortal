import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button, Container, Grid, TextField, MenuItem, Select, InputLabel } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { getCategories } from "@/service/categories-service"; // Importa la función getCategories

import logo from "../../../../../public/logo-grey.svg";
import Image from "next/image";

interface EventFormProps {
  onSubmit: (values: any) => void;
}

const CardEventRegister: React.FC<EventFormProps> = ({ onSubmit }) => {
  const { handleSubmit, control } = useForm();
  const { data: session } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

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

        toastr.success("The event has been created successfully!");
  
        // Llama a la función onSubmit si es necesario
        onSubmit(data);

        router.push("/events");

      } else {
        console.error("Error al enviar datos a la API:", response.statusText);
      }
    } catch (error) {
      console.error("Error en el servidor:", error);

      toastr.error("Error creating event.");
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
              <h1>Register Event</h1>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="eventName"
                    control={control}
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Event name"
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
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Event description"
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
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        label="Event Date"
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
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <TimePicker
                        {...field}
                        label="Event time"
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
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="province"
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
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Municipality"
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
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Adress"
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
    rules={{ required: "This field is required" }}
    render={({ field }) => (
      <>
        <InputLabel>Category</InputLabel>
        <Select
          {...field}
          label="Category"
          fullWidth
          required
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </>
    )}
  />
</Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="artista"
                    control={control}
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Artist"
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
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Entry Stocks"
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
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Type of Tickets"
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
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Ticket Price"
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
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Type of Tickets"
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
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Ticket Price"
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
                  Register event
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
