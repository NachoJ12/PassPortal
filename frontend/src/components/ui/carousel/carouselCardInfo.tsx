import React from "react";
import { Card, CardContent, Typography, CardActions, Button } from "@mui/material";

const CarouselCard = () => {
  return (
    <div>
      <Card className="card-carousel" data-aos="fade-up">
        <CardContent>
          <Typography variant="h6" component="div">
            Worlds 2023 Finals - League of Legends
          </Typography>
          <Typography variant="body2" color="text.secondary">
          ¡Bienvenidos a la emocionante final del Campeonato Mundial de League of Legends 2023 (Worlds)! Este evento épico reúne a los mejores equipos de todo el mundo en una confrontación decisiva para determinar al campeón supremo de League of Legends.
          </Typography>
        </CardContent>
      </Card>
      <Card className="subcard-carousel" data-aos="fade-up">
        <Typography
          variant="h6"
          component="div"
          className="subcard-carousel-typepography"
        >
          PASSPORTAL PRESENTS
        </Typography>
      </Card>
    </div>
  );
};
export default CarouselCard;