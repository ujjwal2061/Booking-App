import React from 'react'
import  Header from '../Pages/Header'
import Screen from './Section'
import { Outlet } from 'react-router'

export default function Layout() {
  return (
    <Screen>
      <Header /> 
      <Outlet />
    </Screen>
  )
}
