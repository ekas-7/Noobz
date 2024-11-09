
import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'

const Layout = ({children}) => {
  return (
    <div className=' grid grid-cols-12 grid-rows-12'>
        <div className=' col-span-12 row-span-2'></div>
        <Sidebar />
        {children}
    </div>
  )
}

export default Layout