
import "./App.scss"

import { CMS } from "./views/CMS/CMS"
import "bootstrap/dist/css/bootstrap.min.css"
import { Navigation } from "./components/Nav/Nav"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SingleView } from "./views/SingleView/SingleView"
import { Stats } from "./views/Stats/Stats"
import { useSearchParams } from "react-router-dom"
import { useEffect } from "react"
import { Login } from "views/Login/Login"
import { AddPoem } from "views/AddPoem/AddPoem"

function App() {  
  
  return (

    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
        <Route path="/login" element={<Login />} />

          <Route path="/" element={<CMS />} />
          <Route path="/stats" element={<Stats/>}/>
          <Route path="/new" element={<AddPoem/>} />

          <Route path="/:id" element={<SingleView/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
