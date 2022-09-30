import React from 'react'
import { Route, Routes } from "react-router-dom";
import BookDemo from './BookDemo/BookDemo';
import FinalFeature from './Feature/FinalFeature'
import Signup from './Signup/Signup';
import Footer from "../Components/Footer/Footer"
import Signin from './Signin/signin';
import Timesheet from './Timesheet/Timesheet';



const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path="/feature" element={<FinalFeature />}></Route>
        <Route path="/BookDemo" element={<BookDemo />}></Route>
        <Route path='/signin' element={<Signin/>}></Route>
        <Route path='/timesheet' element={<Timesheet/>}></Route>
      </Routes>
  
      <Footer />

    </>
  )
}

export default AllRoutes