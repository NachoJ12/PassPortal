import BaseLayout from "@/components/layouts/base-layout";
import SearchBar from '@/components/ui/searchbar/SearchBar';
import { IMunicipioResponse, Municipio, Parametros } from "@/interface/municipio";
import { IProvinciaResponse } from "@/interface/provincia";
import { getMunicipiosByProvincia } from "@/service/municipio-service";
import { getProvinces } from "@/service/province-service";
import type { NextPage, GetServerSideProps } from 'next'

import { CardBox } from '@/components/ui/cardEvent/card'

interface Props {
  municipios: IMunicipioResponse
  provincias: IProvinciaResponse
}

const Home: NextPage<Props> = ({ municipios, provincias }) => {
    return (
      <BaseLayout>
        <SearchBar municipios={municipios} provincias={provincias} />
        <div className="main"><div className="main_prueba"><CardBox/></div></div>
      </BaseLayout>
    )
  }

  export default Home

  export const getServerSideProps: GetServerSideProps = async ({ req, res, params, query }) => {

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
    return {
      props: { provincias, municipios }
    }
  }