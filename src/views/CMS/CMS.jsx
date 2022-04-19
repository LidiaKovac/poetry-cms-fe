import { useEffect, useState } from "react"
import { Container, Table, Dropdown, Spinner } from "react-bootstrap"
import { getPoems } from "../../API"
import { Single } from "../../components/Single/Single"
import { Tag } from "../../components/Tag/Tag"
import "./CMS.scss"
export const CMS = ({ query }) => {
  const [poems, setPoems] = useState([])
  const [sort, setSort] = useState("title")

  const [sources, setSrc] = useState([])
  const [selected, setSelected] = useState("")
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState([])

  const filterBy = (tag) => {
    if(!filters.map(f => f.word).includes(tag.word)) {

      let updated = [...filters, tag]
      setFilters(updated)
    }
  }

  
  useEffect(() => {
    getPoems()
      .then((res) => setPoems(res))
      .then(() => {
        setSrc([...new Set(poems.map((p) => p.source.toLowerCase()))])
      })
      .then(() => {
        setLoading(false)
      })
  }, [])
  useEffect(() => {
    getPoems().then((res) =>
      setPoems(
        res.filter((p) =>
          p.title.toLowerCase().includes(query ? query.toLowerCase() : "")
        )
      )
    )
  }, [query])
  useEffect(() => {
    getPoems().then((res) =>
      setPoems(
        res.filter((p) =>
          p.source.toLowerCase().includes(selected.toLowerCase())
        )
      )
    )
  }, [selected])
  useEffect(() => {
    setLoading(true)
    getPoems(`tag=${filters.map((filter) => filter.word).join("+")}`)
      .then((res) => {
        setPoems(res)
      })
      .then(() => {
        setLoading(false)
      })
  }, [filters])
  return (
    <>
      {loading ? ( <div className="spinner__wrap">

        <Spinner className="spinner" animation="border" role="status"></Spinner>
      </div>
      ) : (
        <Container className="cms__wrap">
          <h1>Laddade Dikter</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th onClick={() => setSort("title")}> Title </th>
                <th onClick={() => setSort("author")}> Author </th>
                <th>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {selected || "Source"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => setSelected("Dikter")}>
                        Dikter
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setSelected("Framtidens skugga")}
                      >
                        Framtidens skugga
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setSelected("Landet som icke är")}
                      >
                        Landet som icke är
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setSelected("Rosaltaret")}>
                        Rosaltaret
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setSelected("Septemberlyran")}
                      >
                        Septemberlyran
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setSelected("Tankar om naturen")}
                      >
                        Tankar om naturen
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </th>
                <th onClick={() => setSort("year")}> Year </th>
                <th>
                  {" "}
                  Tags{" "}
                  {filters.map((f) => (
                    <Tag
                      word={f}
                      filter={(tag) =>{ 
                        console.log(tag);
                        setFilters(filters.filter((f) => f.word !== tag.word))
                     } }
                    />
                  ))}{" "}
                </th>
                <th> Link </th>
              </tr>
            </thead>
            <tbody>
              {poems
                .sort((a, b) => a[sort].localeCompare(b[sort]))
                .map((p) => {
                  return <Single key={p._id} poem={p} filterBy={filterBy} />
                })}
            </tbody>
          </Table>
        </Container>
      )}
    </>
  )
}
