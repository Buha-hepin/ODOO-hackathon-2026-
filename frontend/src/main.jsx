import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import './index.css'
import Login from './pages/Login';
import Register from './pages/Register';
import VehicleRegistry from './pages/VehicleRegistry';
import TripDispatcher from './pages/TripDispatcher';
import Maintenance from './pages/maintenance'; 
import TripExpense from './pages/ExpenceAndFuleLogging'; 
import DriverPerformance from './pages/Performance';
import Analytics from './pages/Analitics.jsx';
import Dashboard from './pages/Dashboard.jsx';




import { BrowserRouter as Router, Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={< Login/>} />
      <Route path="register" element={<Register />} />
      

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/vehicle-registry" element={<VehicleRegistry />} />
      <Route path="/trip-dispatcher" element={<TripDispatcher />} />
      <Route path="/maintenance" element={<Maintenance />} />
      <Route path="/trip-expense" element={<TripExpense />} />
      <Route path="/performance" element={<DriverPerformance />} />
      <Route path="/analytics" element={<Analytics />} />
      
    </>
  )
);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <>
      <RouterProvider router={router}/>
    </>
  </React.StrictMode>,
)
