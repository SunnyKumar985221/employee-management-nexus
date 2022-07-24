import React from 'react'
import { Route } from 'react-router-dom';
import { BrowserRouter,Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Registration from './components/Registration';
import Login from './components/Login';
import Logout from './components/Logout';
import Error from './components/Error';
import Data from './components/Data';
import Details from './components/Details';
import Edit from './components/Edit';



const App = () => {
  return (
    <div>
    {/* //for connecting url browser to our application we use browser router */}
  <BrowserRouter>                      
  <Navbar/>
  {/* router defing our path of pages  */}
  <Routes>
<Route path="/about" element={<About/>}/>

<Route path="/" element={<Home/>}/>
 
<Route path="/login" element={<Login/>}/>
  
<Route path="/signup" element={<Registration/>}/>
<Route path="/data" element={<Data/>}/>

<Route path="/logout" element={<Logout/>}/>
<Route path="data/view/:id" element={<Details/>}/>
<Route path="data/edit/:id" element={<Edit />}/>

 
<Route path="*" element={<Error/>}/>
  </Routes>

    </BrowserRouter>
    </div>
  )
}

export default App