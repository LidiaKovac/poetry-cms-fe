//React
import { useEffect } from "react";
//  => Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
//  =>  =>  Reducers
import { setError } from "../../app/reducers/errorReducer";
import { toggleLoading } from "../../app/reducers/loadingReducer";
import { set } from "../../app/reducers/poemsReducer";
import { setQuery } from "../../app/reducers/queryReducer";

//  => Components
import { Single } from "../../components/Single/Single";
import { Sort } from "../../components/Sort/Sort";
import { Tag } from "../../components/Tag/Tag";
//  =>  =>  Bootstrap
import { Container, Table, Dropdown, Spinner, Alert, Pagination } from "react-bootstrap";

//API
import { getPoems } from "../../API";

//CSS
import "./CMS.scss";

export const CMS = () => {
  //Selectors
  const poems = useSelector((state: RootState) => state.poems.all);
  const pages = useSelector((state: RootState) => state.poems.pages);
  const sources = useSelector((state: RootState) => state.poems.sources);
  const error = useSelector((state: RootState) => state.error.value);
  const loading = useSelector((state: RootState) => state.loading.value);
  const queryObject = useSelector((state: RootState) => state.query.value);

  //Hooks
  const dispatch = useDispatch();
  //INITIAL FETCH
  useEffect(() => {
    getPoems(queryObject)
      .then((res) => dispatch(set(res)))
      .catch((err) => dispatch(setError(err)))
      .finally(() => {
        dispatch(toggleLoading(false));
      });
  }, [queryObject]);
  // Query Handling
  const createQuery = (field: string, query: string | Array<string> | number) => {
    let newQuery = queryObject[field as keyof APIQuery] as string | number;
    
    switch (field) {
      case "sort":
        let currentSort = queryObject.sort;
        let newSort = currentSort.includes("asc") ? query + "_desc" : query + "_asc";
        newQuery = newSort;
        break;
      case "title":
      case "source":
        newQuery = query as string;
        break;
      case "page":
        newQuery = query as number;
        break;
    }

    dispatch(
      setQuery({
        ...queryObject,
        [field]: newQuery,
      })
    );
  };

  return (
    <>
      <h1>Laddade Dikter</h1>
      {error && (
        <Alert key="danger" variant="danger">
          {error}
        </Alert>
      )}
      {loading ? (
        <div className="loader-wrap w-100 d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status"></Spinner>
        </div>
      ) : (
        <Container className="cms__wrap d-flex align-items-center flex-column">
          <Pagination size="lg">
            {pages.map((p) => (
              <Pagination.Item key={"page_" + p} onClick={() => createQuery("page", p)} active={p === queryObject.page}>
                {p}
              </Pagination.Item>
            ))}
          </Pagination>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th onClick={() => createQuery("sort", "title")}>
                  Title
                  <Sort queries={queryObject} sort="title" />
                </th>
                <th onClick={() => createQuery("sort", "author")}>
                  Author
                  <Sort queries={queryObject} sort="author" />
                </th>
                <th>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {queryObject.source || "Source"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {sources?.map((src,i) => (
                        <Dropdown.Item
                        key={"src_" + i}
                          onClick={() => {
                            createQuery("source", src);
                          }}
                        >
                          {src}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  {queryObject.source && (
                    <span
                      onClick={() => {
                        createQuery("source", "");
                      }}
                    >
                      ❌
                    </span>
                  )}
                </th>
                <th
                  onClick={() => {
                    createQuery("sort", "year");
                  }}
                >
                  Year
                  <Sort queries={queryObject} sort="year" />
                </th>
                <th>
                  Tags
                  {queryObject.tags.map((tag) => (
                    <Tag tag={tag} key={tag._id} />
                  ))}
                </th>
                <th> Link </th>
              </tr>
            </thead>
            <tbody>
              {poems?.map((p, i) => (
                <Single key={p._id} i={i} poem={p} />
              ))}
            </tbody>
          </Table>
          <Pagination size="lg">
            {pages.map((p) => (
              <Pagination.Item key={"page_bottom_" + p} onClick={() => createQuery("page", p)} active={p === queryObject.page}>
                {p}
              </Pagination.Item>
            ))}
          </Pagination>
        </Container>
      )}
    </>
  );
};
