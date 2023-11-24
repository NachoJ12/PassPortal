"use client"
import React, { FC, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Event } from '@/data/cardItems';
import CardEvent from "../cardEvent";
import { getAllEvents } from "@/service/events-service";
import { useSession } from 'next-auth/react';

interface Props {
  events: Event[]
}

export const CardEventContainer: FC<Props> = ({ events }) => {
  const [eee, setEEE] = useState()

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




  return (
    <Grid container spacing={4} className="card-container">
      {events.map((item: Event) => (
        <Grid item key={item.id} xs={12} sm={6} md={6} lg={4}>
          <CardEvent event={item} />
        </Grid>
      ))}
    </Grid>
  );
}; 
