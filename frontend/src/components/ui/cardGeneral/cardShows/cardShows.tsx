import { Card, CardContent, Typography } from "@mui/material";
import { Event } from '@/data/cardItems';
import React, {FC} from "react";
import Image from "next/image";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";


interface Props {
    event: Event
  }

const CardsShowEvents: FC<Props> = ({ event }) => {
  return (
          <Card className="cardShow-general" data-aos="fade-up">
            <CardContent className="cardShow-container-image">
              <div>
                <Image
                  src={event.path}
                  alt={event.title}
                  className="cardShow-Image"
                ></Image>
              </div>
            </CardContent>
            <CardContent className="cardShow-container-info">
                <Typography variant="h6" component="div" className="cardShow-title">
                  {event.title}
                </Typography>
                <Typography variant="h6" component="div" className="cardShow-info">
                  <div className="cardShow-info-container"><span><CalendarMonthIcon/></span><span>{event.date}</span></div>
                </Typography>
                <Typography variant="h6" component="div" className="cardShow-info">
                  <div className="cardShow-info-container"><span><LocationOnIcon/></span><span>{event.ubication}</span></div>
                </Typography>
                <Typography variant="h6" component="div" className="cardShow-description">
                  {event.description}
                </Typography>
            </CardContent>
          </Card>
  );
};

export default CardsShowEvents;