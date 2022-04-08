import { useEffect, useState } from "react"
import { Container, Table, Dropdown, Spinner } from "react-bootstrap"
import { getPoems } from "../../API"
import { Single } from "../../components/Single/Single"
import "./CMS.scss"
export const CMS = ({ query }) => {
  const [poems, setPoems] = useState([])
  const [sources, setSrc] = useState([])
  const [selected, setSelected] = useState("")
  const [loading, setLoading] = useState(true)
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
  return (
    <>
      {loading ? (
        <Spinner animation="border" role="status"></Spinner>
      ) : (
        <Container className="cms__wrap">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th> Title </th>
                <th> Author </th>
                <th>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {selected || "Source"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => setSelected("Dikter")}>
                        Dikter
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setSelected("Framtidens skugga")}>
                        Framtidens skugga
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setSelected("Landet som icke är")}>
                        Landet som icke är
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setSelected("Rosaltaret")}>
                        Rosaltaret
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setSelected("Septemberlyran")}>
                        Septemberlyran
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setSelected("Tankar om naturen")}>
                        Tankar om naturen
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </th>
                <th> Year </th>
                <th> Link </th>
              </tr>
            </thead>
            <tbody>
              {poems.map((p) => {
                return <Single key={p._id} poem={p} />
              })}
            </tbody>
          </Table>
        </Container>
      )}
    </>
  )
}
