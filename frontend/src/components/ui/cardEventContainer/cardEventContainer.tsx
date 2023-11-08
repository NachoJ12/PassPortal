import React, { FC } from "react";
import { Grid } from "@mui/material";
import { Event } from '@/data/cardItems';
import CardEvent from "../cardGeneral/cardEvent/cardEvent";

interface Props {
  events: Event[]
}

export const CardEventContainer: FC<Props> = ({ events }) => {

  return (
    <Grid container spacing={4} className="card-container">
      {events.map((item : Event) => (
        <Grid item key={item.id} xs={12} sm={6} md={6} lg={4}>
          <CardEvent event={item} />
        </Grid>
      ))}
    </Grid>
  );
};
