import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <>
       <div className=' bg-gray-500 py-3 flex justify-end items-center'>
      <NavLink
      to="/"
             className={({ isActive }) =>
             `duration-200 ${
               isActive ? "text-orange-700" : "text-white"
             } font-bold border border-white rounded px-3 mx-20`
           }
            >
           Home
            </NavLink>

            <NavLink
      to="/add"
             className={({ isActive }) =>
             `duration-200 ${
               isActive ? "text-orange-700" : "text-white"
             } font-bold border border-white rounded px-3 mx-5`
           }
            >
           Add product
            </NavLink>
    </div>
    </>
  )
}

export default Header
