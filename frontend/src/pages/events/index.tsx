import BaseLayout from '@/components/layouts/base-layout'
import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { getAllEvents, getEventByName, getEventByDate, getEventByCategory, getEventByArtist, getEventByFilters } from '@/service/events-service'
import { Event } from '@/types/events'
import { CardEventContainer } from '@/components/ui/cardGeneral/cardEvent/cardEventContainer/cardEventContainer'
import { IMunicipioResponse } from "@/interface/municipio";
import { IProvinciaResponse } from "@/interface/provincia";
import { getMunicipiosByProvincia } from "@/service/municipio-service";
import { getProvinces } from "@/service/province-service";
import SearchBar from '@/components/ui/searchbar/SearchBar'
import Image from "next/image";
import passPortalLogo from "../../../public/logo-grey.svg";
import Filters from './../../components/ui/filters/Filters';

interface Props {
  events: Event[]
  municipios: IMunicipioResponse
  provincias: IProvinciaResponse
}

const Events: NextPage<Props> = ({ events, municipios, provincias }) => {
  return (
    <BaseLayout>
      <div className='event-page'>
        <Image src={passPortalLogo} alt="logo" className="logo-main" />
        <SearchBar municipios={municipios} provincias={provincias} />
        <Filters />
        <CardEventContainer events={events} />
      </div>
    </BaseLayout>
  )
}

export default Events;

export const getServerSideProps: GetServerSideProps = async ({ res, query }) => {

  let municipios: IMunicipioResponse = {
    cantidad: 0,
    inicio: 0,
    municipios: [
      {
        centroideLat: 0,
        centroideLon: 0,
        id: "",
        nombre: "",
        provinciaID: "",
        provinciaNombre: ""
      }
    ],
    parametros: {
      aplanar: true,
      max: 0,
      provincia: ""
    },
    total: 0,
  };

  const { provincia, municipio, name, artist, date, categories }: any = query;

  if (provincia) {
    municipios = await getMunicipiosByProvincia(provincia)
  }

  const provincias = await getProvinces()


  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )


  let events: Event[] = [];


  switch (true) {
    case Boolean(name):
      events = await getEventByName(name);
      break;
    case Boolean(artist && date && categories):
      events = await getEventByFilters(artist, date, categories);
      break;
    case Boolean(artist && date):
      events = await getEventByFilters(artist, date,"");
      break;
    case Boolean(artist && categories):
      events = await getEventByFilters(artist,"", categories);
      break;
    case Boolean(date && categories):
      events = await getEventByFilters("",date,categories);
      break;
    case Boolean(categories):
      events = await getEventByCategory(categories);
      break;
    case Boolean(artist):
      events = await getEventByArtist(artist);
      break;
    case Boolean(date):
      events = await getEventByDate(date);
      break;
    default:
      events = await getAllEvents();
      break;
  }

  return {
    props: {
      events, provincias, municipios
    }
  }
}
