import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <>
       <div className=' bg-gray-500 py-3 flex justify-end items-center max-[600px]:flex max-[600px]:justify-around'>
      <NavLink
      to="/"
             className={({ isActive }) =>
             `duration-200 ${
               isActive ? "text-orange-700 border-orange-600" : "text-white border-white"
             } font-bold border  rounded px-3 mx-20 max-[600px]:mx-0`
           }
            >
           Home
            </NavLink>

            <NavLink
      to="/add"
             className={({ isActive }) =>
             `duration-200 ${
               isActive ? "text-orange-700 border-orange-600" : "text-white border-white"
             } font-bold border rounded px-3 mx-5 max-[600px]:mx-0`
           }
            >
           Add product
            </NavLink>
    </div>
    </>
  )
}

export default Header
