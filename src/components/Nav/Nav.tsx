// import "./Nav.scss"
import { useEffect, useState, FC } from "react"
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from "react-bootstrap"
import { useDispatch } from "react-redux"
import { changeQuery } from "../../app/reducers/poemsReducer"


export const Navigation:FC = () => {
    const [query, setQuery] = useState("")
    const dispatch = useDispatch()
    useEffect(()=> {
        // if(query.length > 3) {
            // getQuery(query)
            dispatch(changeQuery(query))
        // }
    }, [query])
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Poems CMS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/stats">Stats</Nav.Link>
          </Nav>
          <Form>
            <FormControl onChange={(e)=> setQuery(e.target.value)} type="text" placeholder="Search by title" className="mr-sm-2" />
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}
