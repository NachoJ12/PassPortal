import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import BaseLayout from '@/components/layouts/base-layout'
import { getEventsById } from '@/service/events-service'
import CardEvent from '@/components/ui/cardEvent/cardEvent'
import { Event } from '@/data/cardItems'

interface Props{
    event: Event
}

const EventPage: NextPage<Props> = ({ event }) => {
    return (
        <BaseLayout>
            <CardEvent event={event}/>
        </BaseLayout>
    )
}

export default EventPage

export const getServerSideProps: GetServerSideProps = async ({ res, params, }) => {
    const id: string = typeof params?.id === 'string' ? params.id : ''
    const event = await getEventsById(id)
    return {
        props: {
            event
        }
    }
}
