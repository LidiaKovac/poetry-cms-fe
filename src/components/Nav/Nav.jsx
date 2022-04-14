// import "./Nav.scss"
import { useEffect, useState } from "react"
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from "react-bootstrap"
export const Navigation = ({getQuery}) => {
    const [query, setQuery] = useState("")
    useEffect(()=> {
        // if(query.length > 3) {
            getQuery(query)
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
