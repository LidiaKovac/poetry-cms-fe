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
        <Navbar.Brand href="#home">Poems CMS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Stats</Nav.Link>
            {/* <Nav.Link href="#link">Link</Nav.Link> */}
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Form>
            <FormControl onChange={(e)=> setQuery(e.target.value)} type="text" placeholder="Search by title" className="mr-sm-2" />
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}
