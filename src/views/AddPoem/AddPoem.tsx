import { addNewPoem } from "API"
import { ChangeEvent, ChangeEventHandler, useState } from "react"
import { Accordion, Container, Row, Col, Form, Modal, Button } from "react-bootstrap"
import "./AddPoem.scss"
export const AddPoem = () => {
    interface IPoem extends Object {
        type: string
        txt?: File[]
        html?: File[]
        year: number
        text: string
        src: string
        author: string
    }
    const [newPoem, setNewPoem] = useState<IPoem>({
        type: "",
        txt: [],
        html: [],
        text: "",
        year: 0,
        src: "",
        author: ""
    })
    const [show, setShow] = useState(false);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.type === "file") {
            setNewPoem({
                ...newPoem,
                txt: [],
                html: []
            })
            console.log("now it's empty");

            for (let i = 0; i < event.target.files!.length; i++) {
                const single = event.target.files!.item(i) as File;
                setNewPoem((prev) => {
                    let type = ""
                    if ([...event.target.files!].every((curr) => (curr.type === "text/plain"))) {
                        type = "txt"
                    } else if ([...event.target.files!].every((curr) => (curr.type === "text/html"))) {
                        type = "html"
                    } else {
                        setShow(true)
                        event.target.value = ""
                        return {
                            ...prev,
                            type,
                            [type as keyof IPoem]: [] as File[]
                        }
                    }
                    return {
                        ...prev,
                        type,
                        [type as keyof IPoem]: [...prev[type as keyof IPoem] as File[], single]
                    }
                })

            }
        } else {
            setNewPoem({
                ...newPoem,
                [event.target.id]: event.target.value
            })
        }

    }
    const handleSubmit = (event:React.SyntheticEvent) => {
        event.preventDefault()
        const sendData = new FormData()
        for (const field in newPoem) {
            
            if (Object.prototype.hasOwnProperty.call(newPoem, field)) {
                console.log(field);
                const value = newPoem[field as keyof IPoem];
                if(typeof value === "object") { //if we are looking at the files
                    value.forEach((singleFile)=> {
                        sendData.append(field, singleFile)
                    })

                } else {
                    sendData.append(field, value as string)

                }
                console.log(...sendData);
            }
        }
        addNewPoem(sendData).then(()=> console.log("ok")).catch(()=> console.log("umh"))
        
    }
    return (<>
        <Container>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Error! All files must be of same type</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => setShow(false)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Type</Accordion.Header>
                    <Accordion.Body>

                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Txt File</Accordion.Header>
                    <Accordion.Body>
                        Reccomended formats:
                        <Row >
                            <Col xs={2}>
                                <code> <br />
                                    &lt;big&gt; Title &lt;/big&gt;
                                    <br />
                                    &lt;poem&gt; POEM &lt;/poem&gt;

                                </code>
                            </Col>
                            <Col xs={2}>
                                <code> <br />
                                    &lt;h1&gt; Title &lt;/h1&gt;
                                    <br />
                                    &lt;poem&gt; POEM &lt;/poem&gt;

                                </code> <br />
                            </Col>
                        </Row>

                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>HTML File</Accordion.Header>
                    <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>File</Form.Label>
                    <Form.Control
                    
                        onChange={handleChange}
                        id='files'
                        type="file"
                        accept=".txt, .html"
                        multiple
                        autoFocus
                        disabled={(newPoem.txt!.length > 0 || newPoem.html!.length > 0)}
                    />
                </Form.Group>
                <Form.Group

                    className="mb-3"

                >
                    <Form.Label>Poem</Form.Label>
                    <Form.Control onChange={handleChange} id='text' as="textarea" disabled={(newPoem.txt!.length > 0 || newPoem.html!.length > 0)} />
                </Form.Group>
                <Form.Group
                    className="mb-3"

                >
                    <Form.Label>Source</Form.Label>
                    <Form.Control required onChange={handleChange} id='src' type="text" />
                </Form.Group>
                <Form.Group
                    className="mb-3"

                >
                    <Form.Label>Year</Form.Label>
                    <Form.Control required onChange={handleChange} id='year' type="number" />
                </Form.Group>
                <Form.Group
                    className="mb-3"

                >
                    <Form.Label>Author</Form.Label>
                    <Form.Control required onChange={handleChange} id='author' type="text" />
                </Form.Group>
                <Button type='submit'>Add</Button>
            </Form>
        </Container>
    </>)
}