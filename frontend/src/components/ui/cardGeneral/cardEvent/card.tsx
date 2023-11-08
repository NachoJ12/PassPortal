import React, {useEffect} from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/material";
import imagenPrueba from "../../../../../public/halloween-party-ecuatoriano-215720-min.jpg";
import Image from "next/image";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AOS from 'aos';
import 'aos/dist/aos.css';

export const CardBox = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const cardItems = [
    {
      id: 1,
      title: "HALLOWEEN PARTY ECUATORIANO",
      path: imagenPrueba,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis temporibus natus nobis blanditiis magnam nam repellat necessitatibus quam nihil error?",
      date: "october 31 - 2023",
      ubication: "Ecuador - Quito",
    },
    {
      id: 2,
      title: "HALLOWEEN PARTY ECUATORIANO",
      path: imagenPrueba,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis temporibus natus nobis blanditiis magnam nam repellat necessitatibus quam nihil error?",
      date: "october 31 - 2023",
      ubication: "Ecuador - Quito",
    },
    {
      id: 3,
      title: "HALLOWEEN PARTY ECUATORIANO",
      path: imagenPrueba,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis temporibus natus nobis blanditiis magnam nam repellat necessitatibus quam nihil error?",
      date: "october 31 - 2023",
      ubication: "Ecuador - Quito",
    },
    {
      id: 4,
      title: "HALLOWEEN PARTY ECUATORIANO",
      path: imagenPrueba,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis temporibus natus nobis blanditiis magnam nam repellat necessitatibus quam nihil error?",
      date: "october 31 - 2023",
      ubication: "Ecuador - Quito",
    },
    {
      id: 5,
      title: "HALLOWEEN PARTY ECUATORIANO",
      path: imagenPrueba,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis temporibus natus nobis blanditiis magnam nam repellat necessitatibus quam nihil error?",
      date: "october 31 - 2023",
      ubication: "Ecuador - Quito",
    },
    {
      id: 6,
      title: "HALLOWEEN PARTY ECUATORIANO",
      path: imagenPrueba,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis temporibus natus nobis blanditiis magnam nam repellat necessitatibus quam nihil error?",
      date: "october 31 - 2023",
      ubication: "Ecuador - Quito",
    },
    {
      id: 7,
      title: "HALLOWEEN PARTY ECUATORIANO",
      path: imagenPrueba,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis temporibus natus nobis blanditiis magnam nam repellat necessitatibus quam nihil error?",
      date: "october 31 - 2023",
      ubication: "Ecuador - Quito",
    },
    {
      id: 8,
      title: "HALLOWEEN PARTY ECUATORIANO",
      path: imagenPrueba,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis temporibus natus nobis blanditiis magnam nam repellat necessitatibus quam nihil error?",
      date: "october 31 - 2023",
      ubication: "Ecuador - Quito",
    },
    {
      id: 9,
      title: "HALLOWEEN PARTY ECUATORIANO",
      path: imagenPrueba,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis temporibus natus nobis blanditiis magnam nam repellat necessitatibus quam nihil error?",
      date: "october 31 - 2023",
      ubication: "Ecuador - Quito",
    },
    {
      id: 10,
      title: "HALLOWEEN PARTY ECUATORIANO",
      path: imagenPrueba,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis temporibus natus nobis blanditiis magnam nam repellat necessitatibus quam nihil error?",
      date: "october 31 - 2023",
      ubication: "Ecuador - Quito",
    },
    {
      id: 11,
      title: "HALLOWEEN PARTY ECUATORIANO",
      path: imagenPrueba,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis temporibus natus nobis blanditiis magnam nam repellat necessitatibus quam nihil error?",
      date: "october 31 - 2023",
      ubication: "Ecuador - Quito",
    },
    {
      id: 12,
      title: "HALLOWEEN PARTY ECUATORIANO",
      path: imagenPrueba,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis temporibus natus nobis blanditiis magnam nam repellat necessitatibus quam nihil error?",
      date: "october 31 - 2023",
      ubication: "Ecuador - Quito",
    },
    {
      id: 13,
      title: "HALLOWEEN PARTY ECUATORIANO",
      path: imagenPrueba,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis temporibus natus nobis blanditiis magnam nam repellat necessitatibus quam nihil error?",
      date: "october 31 - 2023",
      ubication: "Ecuador - Quito",
    },
  ];
  return (
    <Grid container spacing={4} className="card-container">
      {cardItems.map((item, index) => (
        <Grid item key={item.id} xs={12} sm={6} md={6} lg={4}>
          <Card key={index} className="card-general" data-aos="fade-up">
            <CardContent className="card-elements">
              <Image src={item.path} alt={item.title} className="card-image" />
              <div className="card-info">
                <div className="description-card">
                  <div className="card-date-ubication">
                    <span className="card-icon">
                      <CalendarMonthIcon />
                    </span>
                    <span className="card-name">{item.date}</span>
                  </div>
                  <div className="card-date-ubication">
                    <span className="card-icon">
                      <LocationOnIcon />
                    </span>
                    <span className="card-name">{item.ubication}</span>
                  </div>
                </div>
                <Typography variant="h3" className="card-typography">
                  {item.title}
                </Typography>
                <Typography
                  variant="h6"
                  align="center"
                  className="card-typography-description"
                >
                  {item.description}
                </Typography>
                <CardActions className="card-boton">
                  <Button variant="outlined" color="primary" className="boton">
                    Reservar
                  </Button>
                </CardActions>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
