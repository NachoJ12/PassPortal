import BaseLayout from "@/components/layouts/base-layout";
import type { NextPage } from "next";
import CardUpcomingContainer from "@/components/ui/cardGeneral/cardUpcoming/cardUpcomingContainer/cardUpcomingContainer";
import { cardItems, Event } from "@/data/cardItems";
import { CardShowsContainer } from "@/components/ui/cardGeneral/cardShows/cardShowsContainer/cardShowsContainer";
import CarouselImage from "@/components/ui/carousel/carousel";
import CarouselCard from "@/components/ui/carousel/carouselCardInfo";
import Image from "next/image";
import passPortalLogo from "../../public/logo-grey.svg";
import { Card, Typography, CardActions, Button } from "@mui/material";

const Home: NextPage = () => {
  return (
    <BaseLayout>
      <div className="home-page">
        <Image src={passPortalLogo} alt="logo" className="logo-main" />
        <div className="main-container">
          <div>
            <CarouselImage />
            <CarouselCard />
          </div>
          <div>
            <Card className="subcard-Upcoming" data-aos="fade-up">
              <Typography
                variant="h6"
                component="div"
                className="subcard-Upcoming-typepography"
              >
                Upcoming Events
              </Typography>
              <CardActions>
                <Button
                  variant="outlined"
                  color="primary"
                  className="boton-Upcoming"
                >
                  Show More
                </Button>
              </CardActions>
            </Card>
            <CardUpcomingContainer events={cardItems} />
          </div>
        </div>
        <CardShowsContainer events={cardItems} />
      </div>
    </BaseLayout>
  );
};

export default Home;
