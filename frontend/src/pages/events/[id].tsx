import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import BaseLayout from '@/components/layouts/base-layout'
import { getEventsById } from '@/service/events-service'
import CardEvent from '@/components/ui/cardGeneral/cardEvent/cardEvent'
import { Event } from '@/data/cardItems'
import { usePathname } from 'next/navigation';

interface Props{
    event: Event
}

const EventPage: NextPage<Props> = ({ event }) => {
    const path = usePathname()
    return (
        <BaseLayout>
             {/* <CardEvent event={event}/>  */}
            <div > Show details {path}</div>
        </BaseLayout>
    )
}

export default EventPage

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//     const id: string = typeof params?.id === 'string' ? params.id : ''
//     const event = await getEventsById(id)
//     return {
//         props: {
//             event
//         }
//     }
// }
