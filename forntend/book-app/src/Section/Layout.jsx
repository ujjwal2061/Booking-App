import React from 'react'
import  Header from '../Pages/Header'

import { Outlet } from 'react-router'

export default function Layout() {
  return (
    <div  className='min-h-screen b w-full bg-maincolor  '>
      <Header />
      <div className='flex-grow'>
      <Outlet />
      </div>
    </div>
  )
}
