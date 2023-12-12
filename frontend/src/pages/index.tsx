import React from 'react';
import BaseLayout from '@/components/layouts/base-layout';
import CardUpcomingContainer from '@/components/ui/cardGeneral/cardUpcoming/cardUpcomingContainer/cardUpcomingContainer';
import { CardShowsContainer } from '@/components/ui/cardGeneral/cardShows/cardShowsContainer/cardShowsContainer';
import CarouselImage from '@/components/ui/carousel/carousel';
import CarouselCard from '@/components/ui/carousel/carouselCardInfo';
import Image from 'next/image';
import passPortalLogo from '../../public/logo-grey.svg';
import { Card, Typography, CardActions, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <BaseLayout>
      <div className="home-page">
        <Image 
          src={passPortalLogo} 
          alt="logo" 
          className="logo-main" />
        <div className="main-container">
          <div>
            <CarouselImage />
            <CarouselCard />
          </div>
          <div className="upcoming-section">
            <Card className="subcard-Upcoming" data-aos="fade-up">
              <Typography variant="h6" component="div" className="subcard-Upcoming-typepography">
                Upcoming Events
              </Typography>
              <CardActions>
                <Button variant="outlined" color="primary" className="boton-Upcoming" onClick={() => router.push(`events`)}>
                  Show More
                </Button>
              </CardActions>
            </Card>
            <CardUpcomingContainer  />
          </div>
        </div>
        <div className="cardShow-main-container">
          <h2 className="cardShow-main-title">Show And Events</h2>
          <CardShowsContainer  />
        </div>
      </div>
    </BaseLayout>
  );
};

export default Home;
