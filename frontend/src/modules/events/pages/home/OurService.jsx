
import React from 'react'

import { ReactComponent as JoinEventIcon } from './IconsSource/joinEvent.svg';
import { ReactComponent as EditEventIcon } from './IconsSource/editEvent.svg';
import { ReactComponent as ManageEventIcon } from './IconsSource/manageEvents.svg';
export function OurService({ title, description }) {
    const HandelIcon = () => {
        if (title === 'Manage Events') {

            return <ManageEventIcon width='90px' fill='rgb(170 194 43)' />
        } else
            if (title === 'Customize Event Materials') {

                return <EditEventIcon width='90px' fill='rgb(170 194 43)' />
            } else
                if (title === "Discover and Join Events") {
                    return <JoinEventIcon width='90px' fill='rgb(170 194 43)' />
                } else {
                    return <></>
                }
    }



    return (<>

        <div className='flex self-center grow'>
            <HandelIcon />
        </div>
        <h6 className='align-left'>{title}</h6>
        <p className='pt-[3%] align-left font-["Roboto", "Helvetica", "Arial", sans-serif;] font-normal  leading-6 tracking-[0.00938em] p-[10px] pl-0'>
            {description}
        </p>
        
    </>
    )
}
