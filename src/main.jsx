import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Route ,RouterProvider, createBrowserRouter, createRoutesFromChildren } from 'react-router-dom'
import ProductsList from './ProductsList.jsx'
import AddProduct from './AddProduct.jsx'
import ErrorPage from './ErrorPage.jsx'

const router = createBrowserRouter(createRoutesFromChildren(
  <Route path='/' element= {<App />} errorElement={<ErrorPage />}>
  <Route path='' element = {<ProductsList />} />
  <Route path='add' element = {<AddProduct />} />
  </Route>
))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
