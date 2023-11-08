import React from "react";
import { cardItems } from "@/utils/jsons";
import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import Image from "next/image";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export const CardUpcoming = () => {
  return (
    <div className="cardUpcoming-container">
      {cardItems.slice(0, 6).map((item, index) => (
        <div key={item.id} className="custom-Upcoming-container">
          <Card key={index} className="cardUpcoming-general" data-aos="fade-up">
            <CardContent className="cardUpcoming-elements">
            <div className="cardUpcoming-image-container">
              <Image
                src={item.path}
                alt={item.title}
                className="cardUpcoming-image"
                />
            </div>
            <div className="cardUpcoming-info">
                <Typography variant="h3" className="cardUpcoming-typography">
                  {item.title.length > 20 ? `${item.title.slice(0, 20)}...` :
                  item.title}
                </Typography>
                <div className="cardUpcoming-description">
                  <div className="cardUpcoming-date-ubication">
                    <span className="cardUpcoming-icon">
                      <CalendarMonthIcon />
                    </span>
                    <span className="cardUpcoming-name">{item.date}</span>
                  </div>
                  <div className="cardUpcoming-date-ubication">
                    <span className="cardUpcoming-icon">
                      <LocationOnIcon />
                    </span>
                    <span className="cardUpcoming-name">{item.ubication}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};
