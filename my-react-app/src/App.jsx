import { useState } from 'react'
import React, { Suspense } from "react";
import { useContext } from 'react';
import { Link, Outlet, NavLink } from "react-router-dom";

import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'

import './App.css'
import { ThemeProvider, AppContext } from './context/AppContext.jsx';
import Counter from '../src/Containers/Counter'

import Button from '../src/Components/Button.jsx'
import Hello from '../src/Components/Hello'
import ControlledInput from '../src/Components/Forms/ControlledInput'
import ControlledSelect from '../src/Components/Forms/ControlledSelect'
import UncontrolledInput from '../src/Components/Forms/UncontrolledInput'
import UserProfile from '../src/Components/Forms/UserProfile'
import MessageComponent from '../src/Components/MessageComponent'
import ErrorBoundary from "../src/Components/ErrorBoundary.jsx";
import DataFetcher from '../src/Components/DataFetcher.jsx'
import StyledComponentTest from '../src/Components/StyledComponentTest.jsx'
import Home from './Components/Pages/Home.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div id='App'>
      <nav>
        <NavLink to="/">Home</NavLink> |{" "}
        <NavLink to="/about" end>About</NavLink> |{" "}
        <NavLink to="/contact">Contact</NavLink>
      </nav>
      
      <ThemeProvider>
        <Home />
      </ThemeProvider>
      {/* <Counter /> */}
      {/* <Button text='Натисни мене' alert='Кнопка натиснута' /> */}
      {/* <Hello /> */}
      {/* <ControlledInput /> */}
      {/* <ControlledSelect /> */}
      {/* <UncontrolledInput /> */}
      {/* <UserProfile /> */}
      {/* <ErrorBoundary> */}
      {/* <Suspense fallback={<p>Завантаження постів...</p>}> */}
      {/* <MessageComponent /> */}
      {/* </Suspense> */}
      {/* </ErrorBoundary> */}
      {/* <DataFetcher /> */}
      {/* <StyledComponentTest /> */}

    </div>
  )
}

export default App
