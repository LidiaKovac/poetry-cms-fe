import logo from "./logo.svg"
import "./App.css"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { useEffect, useState } from "react"
import { CMS } from "./views/CMS/CMS"
import "bootstrap/dist/css/bootstrap.min.css"
import { Navigation } from "./components/Nav/Nav"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SingleView } from "./views/SingleView/SingleView"
import { Stats } from "./views/Stats/Stats"

function App() {
  const [query, setQuery] = useState("")
  // useEffect(() => {
  //   fetch("http://localhost:3001/poems/stats")
  //     .then((res) => res.json())
  //     .then((poems) => setData(poems.slice(0,20)))
  // }, [])
  return (
    // <BarChart
    //   width={2000}
    //   height={300}
    //   data={data}
    //   margin={{
    //     top: 20,
    //     right: 30,
    //     left: 20,
    //     bottom: 5,
    //   }}
    // >
    //   <CartesianGrid strokeDasharray="3 3" />
    //   <XAxis dataKey="word" />
    //   <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
    //   <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
    //   <Tooltip />
    //   <Legend />
    //   <Bar yAxisId="left" dataKey="occurences" fill="#8884d8" />
    //   {/* <Bar yAxisId="right" dataKey="uv" fill="#82ca9d" /> */}
    // </BarChart>
    <>
      <BrowserRouter>
        <Navigation getQuery={(d) => setQuery(d)} />
        <Routes>
          <Route path="/" element={<CMS query={query} />} />
          <Route path="/:id" element={<SingleView/>} />
          <Route path="/stats" element={<Stats/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
