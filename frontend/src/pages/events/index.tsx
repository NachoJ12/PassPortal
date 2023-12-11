import React from 'react'
import BaseLayout from '@/components/layouts/base-layout'
import { GetServerSideProps, NextPage } from 'next'
import { getAllEvents, getEventByName, getEventByDate, getEventByArtist, getEventByCategories, getEventByArtistAndCategories, getEventsByFilters, } from '@/service/events-service'
import { getCategories } from '@/service/categories-service'

import { Event } from '@/types/events'
import { CardEventContainer } from '@/components/ui/cardGeneral/cardEvent/cardEventContainer/cardEventContainer'
import { IMunicipioResponse } from "@/interface/municipio";
import { IProvinciaResponse } from "@/interface/provincia";
import { getMunicipiosByProvincia } from "@/service/municipio-service";
import { getProvinces } from "@/service/province-service";
import SearchBar from '@/components/ui/searchbar/SearchBar'
import Image from "next/image";
import passPortalLogo from "../../../public/logo-grey.svg";
import Filters from '@/components/ui/filters/Filters';
import { Category } from '@/types/categories'

interface Props {
  events: Event[]
  category: Category[]
  // municipios: IMunicipioResponse
  // provincias: IProvinciaResponse
}

const Events: NextPage<Props> = ({ events, category }) => {
  return (
    <BaseLayout>
      <div className='event-page'>
        <Image src={passPortalLogo} alt="logo" className="logo-main" />
        <SearchBar
        // municipios={municipios} 
        // provincias={provincias}

        />
        <Filters category={category} />
        <CardEventContainer events={events} />
      </div>
    </BaseLayout>
  )
}

export default Events;

export const getServerSideProps: GetServerSideProps = async ({ res, query }) => {

  // let municipios: IMunicipioResponse = {
  //   cantidad: 0,
  //   inicio: 0,
  //   municipios: [
  //     {
  //       centroideLat: 0,
  //       centroideLon: 0,
  //       id: "",
  //       nombre: "",
  //       provinciaID: "",
  //       provinciaNombre: ""
  //     }
  //   ],
  //   parametros: {
  //     aplanar: true,
  //     max: 0,
  //     provincia: ""
  //   },
  //   total: 0,
  // };

  const { country, city, artist, categories, name, dateFormat }: any = query;

  // if (provincia) {
  //   municipios = await getMunicipiosByProvincia(provincia)
  // }

  // const provincias = await getProvinces()


  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  let events: Event[] = []

  switch (true) {
    case Boolean(country || city || artist || categories || name || dateFormat):
      // Perform actions for when at least one filter parameter is provided
      events = await getEventsByFilters(country, city, artist, categories, name, dateFormat);
      break;
    default:
      // Perform actions when no filter parameters are provided
      events = await getEventsByFilters(); // This will call the function with no parameters
      break;
  }

  const category = await getCategories()
  console.log(events)
  return {
    props: {
      events, category
    }
  }
}
