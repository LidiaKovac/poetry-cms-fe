import { stat } from "fs"
import { useEffect, useRef, useState } from "react"
import { Container, Table, Dropdown, Spinner } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { getPoems } from "../../API"
import { setError } from "../../app/reducers/errorReducer"
import { setLoading } from "../../app/reducers/loadingReducer"
import {
  set,
  setBySource,
  setFiltered,
  setTags,
  throwError,
} from "../../app/reducers/poemsReducer"
import { RootState } from "../../app/store"
import { Single } from "../../components/Single/Single"
import { Tag } from "../../components/Tag/Tag"
import "./CMS.scss"
export const CMS = () => {
  const dispatch = useDispatch()
  const poems = useSelector((state: RootState) => state.poems.all)
  const filtered = useSelector((state: RootState) => state.poems.filtered)
  const poemError = useSelector((state: RootState) => state.poems.error)
  const [sort, setSort] = useState("title")

  const [sources, setSrc] = useState<Set<string>>(new Set())

  const [selected, setSelected] = useState("")
  const loading = useSelector((state: RootState) => state.loading.value)
  const setLoader = (isLoading: Boolean) => {
    dispatch(setLoading(isLoading))
  }
  const ref = useRef(0)
  const prev = ref.current
  const filters = useSelector((state: RootState) => state.filters.value)
  const query = useSelector((state: RootState) => state.query.value)

  useEffect(() => {
    getPoems()
      .then((res) => dispatch(set(res)))
      .then(() => {
        setSrc(new Set(poems.map((p) => p.source.toLowerCase())))
      })
      .then(() => {
        setLoader(false)
      })
  }, [])
  useEffect(() => {
    dispatch(setFiltered(query))
  }, [query])

  useEffect(()=> {
    ref.current = Number(filtered.length)
   
    if (ref.current === 0 && prev > 0) {
      dispatch(throwError("No results"))
    }
    console.log(ref, prev);
    
  }, [filtered])

  useEffect(() => {
    dispatch(setBySource(selected))
  }, [selected])
  useEffect(() => {
    setLoader(true)
    getPoems(`tag=${filters.map((filter) => filter.word).join("+")}`)
      .then((res) => {
        dispatch(setTags(res))
      })
      .then(() => {
        setLoader(false)
      })
  }, [filters])
  return (
    <>
      <h1>Laddade Dikter</h1>
      {loading ? (
        <Spinner animation="border" role="status"></Spinner>
      ) : (
        
        <Container className="cms__wrap">
          {poemError}
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
                  {filters.map((f: Tag) => (
                    <Tag word={f} />
                  ))}{" "}
                </th>
                <th> Link </th>
              </tr>
            </thead>
            <tbody>
              
              {(filtered.length > 0)
                ? filtered.map((p) => {
                    return <Single key={p._id} poem={p} />
                  })
                : poems
                    // .sort((a, b) => a[sort as keyof Poem].localeCompare(b[sort as keyof Poem]))
                    .map((p) => {
                      return <Single key={p._id} poem={p} />
                    })}
            </tbody>
          </Table>
        </Container>
      )}
    </>
  )
}
