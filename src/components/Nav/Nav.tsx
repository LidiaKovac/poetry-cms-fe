import { useEffect, useState, FC } from "react"
import { Navbar, Nav, Form, FormControl } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "redux-config/store"
import { setQuery } from "redux-config/reducers/queryReducer"
import { logout } from "API"


export const Navigation: FC = () => {
  const [title, setTitle] = useState<string>("")
  const dispatch = useDispatch()
  const queryObject = useSelector((state: RootState) => state.query.value)

  useEffect(() => {
    dispatch(setQuery({ ...queryObject, title }))
  }, [title])

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Poems CMS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" >
            <Nav.Link disabled href="/stats">Stats</Nav.Link>
          </Nav>
          <Nav className="mr-2" onClick={()=> logout()}>
            Logout
          </Nav>
          <Nav className="mr-auto">
            <Nav.Link href="/new">Add</Nav.Link>
          </Nav>
          <Form>
            <FormControl onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Search by title" className="mr-sm-2" />
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}
