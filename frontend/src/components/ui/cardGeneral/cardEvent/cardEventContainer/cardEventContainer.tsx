"use client"
import React, { FC, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Event } from '@/types/events'
import CardEvent from "../cardEvent";
import { getAllEvents } from "@/service/events-service";

interface Props {
  events: Event[]
}

export const CardEventContainer: FC<Props> = ({ events }) => {
  const [eee, setEEE] = useState<Event[]>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllEvents();
        setEEE(data);

      } catch (error) {

        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  console.log(eee)


  return (
    <Grid container spacing={4} className="card-container">
      {events?.map((item: Event) => (
        <Grid item key={item.id} xs={12} sm={6} md={6} lg={4}>
          <CardEvent event={item} />
        </Grid>
      ))}
    </Grid>
  );
}; 
