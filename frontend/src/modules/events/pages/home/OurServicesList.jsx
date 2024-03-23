import { Grid, Typography } from '@mui/material'

import React from 'react'
import { OurService } from './OurService'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function OurServicesList(props) {
  const list = [
    { title: "Manage Events", description: " Effortlessly create, manage, and customize your events your events anytime." },
    { title: "Customize Event Materials", description: "Access a versatile workspace to design personalized event cards or posters." },
    { title: "Discover and Join Events", description: "Explore and join events hosted by others." },
  ]
  const navigate = useNavigate();
  const rdxUser = useSelector((state) => state.user);
  return (
    <>
      <div className="flex flex-col justify-center m-[10px] items-center" >
        <div >
          <h4 className='text-center mb-2 font-medium font-[Auto] text-[3vw] mb-10'>
            Our website offers a comprehensive platform
          </h4>
        </div>

        <div className="lg:w-[70%] md:w-[90%] sm:w-[100%]">

          <div className='grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-3 ' >

            {list.map((service) => (
              <div className='flex flex-col flex-1 justify-center items-center shadow mr-2 p-[5px] mb-4 hover:bg-[#5c691b33] rounded-sm' key={service.title}
                onClick={rdxUser.loggedIn ? navigate('/workspace') : () => navigate('/register')} >

                <OurService title={service.title} description={service.description} />

              </div>
            ))}

          </div>
        </div>

      </div>
    </>
  )
}
