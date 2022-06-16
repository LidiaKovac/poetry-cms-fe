import { useEffect, useState } from "react"
import { Spinner, Container } from "react-bootstrap"
import "./Stats.scss"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
  } from "recharts"
export const Stats = () => {
    const [data, setData] = useState([])
    const [word, setWord] = useState([])
    const [loading, setLoading] = useState(true)
    const findWord = (query) => {
        
        fetch("http://localhost:3001/poems/stats")
        .then((res) => res.json())
        .then((poems) => setWord(poems.filter(w => w.word.toLowerCase().includes(query.toLowerCase()))))
        .catch(err => alert(err))
    }
    useEffect(() => {
      fetch("http://localhost:3001/poems/stats")
        .then((res) => res.json())
        .then((poems) => setData(poems.slice(0, 10)))
        .catch(err => alert(err))
        .finally(()=> setLoading(false))
    }, [])
  return <> 
  <Container >

  
  {loading ? (
        <Spinner animation="border" role="status"></Spinner>
      ) :
      <>
    <BarChart
      width={1000}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="word" />
      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
      <Tooltip />
      <Legend />
      <Bar yAxisId="left" dataKey="occurences" fill="#8884d8" />
      {/* <Bar yAxisId="right" dataKey="uv" fill="#82ca9d" /> */}
    </BarChart>
    <input onChange={(e)=> findWord(e.target.value)}/>
    {word.map(w => <div>{w.word}, {w.occurences} times</div>)}
    </>
}
</Container>
  </>
}
