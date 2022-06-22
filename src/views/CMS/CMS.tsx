import { current } from "@reduxjs/toolkit"
import { useEffect, useRef, useState } from "react"
import { Container, Table, Dropdown, Spinner, Alert, Pagination } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { getCount, getPoems } from "../../API"
import { setError } from "../../app/reducers/errorReducer"
import { setLoading } from "../../app/reducers/loadingReducer"
import {
  set,
  setCount,
  //setFiltered,
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
  const count = useSelector((state: RootState) => state.poems.count)

  const [sort, setSort] = useState("title_asc")
  const [sources, setSrc] = useState<Set<string>>(new Set())
  const [queries, setQueries] = useState<APIQuery>({
    source: new Set(),
    sort: new Set(),
    tags: new Set(),
    title: new Set(),
  })
  const [selected, setSelected] = useState("")
  const [pages, setPages] = useState<Array<number>>([1])
  const [current, setCurrent] = useState<number>(1)

  const loading = useSelector((state: RootState) => state.loading.value)
  const ref = useRef(0)
  const prev = ref.current
  const filters = useSelector((state: RootState) => state.poems.tags)
  const query = useSelector((state: RootState) => state.poems.query)
  const error = useSelector((state: RootState) => state.error.value)

  const createQuery = (field: string, query: string | Array<string>) => {
    dispatch(setLoading(true))
    if (field === "sort") {
      setSort(query as string)
    }
    console.log(Object.keys(queries))
    let newQuery = queries[field as keyof APIQuery]
    // console.log(newQuery);
    switch (field) {
      case "sort":
      case "title":
      case "source":
        newQuery.clear()
        newQuery.add(query as string)
        break

      case "tags":
        newQuery.clear()
        let queryList = query as Array<string>
        queryList.forEach((q) => {
          newQuery.add(q)
        })
        break
    }

    setQueries((q: APIQuery) => {
      q[field as keyof APIQuery] = newQuery
      return q
    })
    // getQueryString(queries)
    getPoems(queries).then((foundPoems) => dispatch(set(foundPoems))).then(()=> dispatch(setLoading(false)) )
  }
  useEffect(()=> {
    setPages([])
    for (let i = 0; i < count/15; i++) {
      setPages(p => [...p, i+1])
    }
  }, [count])
  useEffect(() => {
    dispatch(setLoading(true))
    queries.sort.clear()
    queries.sort.add(sort)
    getPoems(queries, current)
      .then((res) => dispatch(set(res)))
      .then(()=> getCount())
      .then((count) => {
        console.log("from API", count);
        
        dispatch(setCount(count))})
      .then(() => {
        setSrc(new Set(poems.map((p) => p.source.toLowerCase())))
      })
      .catch((err) => dispatch(setError(err)))
      .finally(() => {
       dispatch( setLoading(false))
      })
  }, [current])
  useEffect(() => {
    if (query.length > 0) {
      createQuery("title", query)
    }
  }, [query])

  useEffect(() => {
    if (filtered.length > 0) {
      ref.current = Number(filtered.length)
    }
    if (ref.current === 0 && prev > 0) {
      dispatch(throwError("No results"))
    }
  }, [filtered])

  useEffect(() => {
    if (filters.length > 0)
      createQuery(
        "tags",
        filters.map((f) => f._id)
      )
  }, [filters])
  return (
    <>
      <h1>Laddade Dikter</h1>
      {error && (
        <Alert key="danger" variant="danger">
          {error}
        </Alert>
      )}
      {loading ? (
        <Spinner animation="border" role="status"></Spinner>
      ) : (
        
        <Container className="cms__wrap">
          <Pagination size="lg">
            {pages.map(p => <Pagination.Item onClick={()=> setCurrent(p)} active={p === current}>{p}</Pagination.Item>)}
          </Pagination>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th
                  onClick={() => {
                    let currentSort = queries.sort.values().next().value
                    createQuery(
                      "sort",
                      currentSort === "title_asc" ? "title_desc" : "title_asc"
                    )
                  }}
                >
                  Title
                  {sort.includes("title") &&
                    (queries.sort.values().next().value === "title_asc"
                      ? " 🔽 "
                      : " 🔼 ")}
                </th>
                <th
                  onClick={() => {
                    let currentSort = queries.sort.values().next().value
                    createQuery(
                      "sort",
                      currentSort === "author_asc"
                        ? "author_desc"
                        : "author_asc"
                    )
                    createQuery(
                      "sort",
                      currentSort === "author_asc"
                        ? "author_desc"
                        : "author_asc"
                    )
                  }}
                >
                  Author
                  {sort.includes("author") &&
                    (queries.sort.values().next().value === "author_asc"
                      ? " 🔽 "
                      : " 🔼 ")}
                </th>
                <th>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {selected || "Source"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => {
                          setSelected("Dikter")
                          createQuery("source", "Dikter")
                        }}
                      >
                        Dikter
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setSelected("Framtidens skugga")
                          createQuery("source", "Framtidens skugga")
                        }}
                      >
                        Framtidens skugga
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setSelected("Landet som icke är")
                          createQuery("source", "Landet som icke är")
                        }}
                      >
                        Landet som icke är
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setSelected("Rosaltaret")
                          createQuery("source", "Rosaltaret")
                        }}
                      >
                        Rosaltaret
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setSelected("Septemberlyran")
                          createQuery("source", "Septemberlyran")
                        }}
                      >
                        Septemberlyran
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          setSelected("Tankar om naturen")
                          createQuery("source", "Tankar om naturen")
                        }}
                      >
                        Tankar om naturen
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  {selected && (
                    <span
                      onClick={() => {
                        createQuery("source", "")
                        setSelected("")
                      }}
                    >
                      ❌
                    </span>
                  )}
                </th>
                <th
                  onClick={() => {
                    let currentSort = queries.sort.values().next().value
                    createQuery(
                      "sort",
                      currentSort === "year_asc" ? "year_desc" : "year_asc"
                    )
                  }}
                >
                  Year
                  {sort.includes("year") &&
                    (queries.sort.values().next().value === "year_asc"
                      ? " 🔽 "
                      : " 🔼 ")}
                </th>
                <th>
                  Tags
                  {filters.map((f: Tag) => (
                    <Tag word={f} key={f._id} />
                  ))}
                </th>
                <th> Link </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0
                ? filtered.map((p, i) => {
                    return <Single key={p._id} i={i} poem={p} />
                  })
                : poems
                    // .sort((a, b) => a[sort as keyof Poem].localeCompare(b[sort as keyof Poem]))
                    .map((p, i) => {
                      return <Single key={p._id} i={i} poem={p} />
                    })}
            </tbody>
          </Table>
          <Pagination size="lg">
            {pages.map(p => <Pagination.Item onClick={()=> setCurrent(p)} active={p === current}>{p}</Pagination.Item>)}
          </Pagination>
        </Container>
      )}
    </>
  )
}
