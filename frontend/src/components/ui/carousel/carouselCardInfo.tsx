import React from "react";
import { Card, CardContent, Typography, CardActions, Button } from "@mui/material";

const CarouselCard = () => {
  return (
    <div>
      <Card className="card-carousel" data-aos="fade-up">
        <CardContent>
          <Typography variant="h6" component="div">
            Worlds 2019 Finals - League of Legends
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, vel
            corporis? Perspiciatis veritatis inventore, similique assumenda,
            architecto ducimus quibusdam eum minus sequi quia omnis quidem?
            Excepturi debitis necessitatibus amet aliquid?
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