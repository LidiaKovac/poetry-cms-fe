
import "./App.scss"

import { CMS } from "./views/CMS/CMS"
import "bootstrap/dist/css/bootstrap.min.css"
import { Navigation } from "./components/Nav/Nav"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SingleView } from "./views/SingleView/SingleView"
import { Stats } from "./views/Stats/Stats"

function App() {
  

  return (

    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<CMS />} />
          <Route path="/:id" element={<SingleView/>} />
          <Route path="/stats" element={<Stats/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
