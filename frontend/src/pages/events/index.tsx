import BaseLayout from '@/components/layouts/base-layout'
import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { getAllEvents } from '@/service/events-service'
import { Event } from '@/types/events'
import { CardEventContainer } from '@/components/ui/cardGeneral/cardEvent/cardEventContainer/cardEventContainer'
import { IMunicipioResponse,} from "@/interface/municipio";
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
      <Filters/>
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

  const { provincia, municipio }: any = query;

  if (provincia) {
    municipios = await getMunicipiosByProvincia(provincia)
  }

  const provincias = await getProvinces()


  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  const events = await getAllEvents()

  return {
    props: {
      events, provincias, municipios
    }
  }
}
