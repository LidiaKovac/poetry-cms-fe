import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container } from "react-bootstrap"
import { getSingle } from "../../API"
import "./SingleView.scss"
import { Tag } from "../../components/Tag/Tag"
export const SingleView = () => {
    const {id} = useParams()
    const [poem, setPoem] = useState({
      title: "",
      author: "",
      text: "",
      source: "",
      year: "",
      tags: []
    })
    useEffect(()=> {
        getSingle(id).then(res => setPoem({...res, text: res.text.replaceAll("\r", "<br>").replaceAll("\n", "<br>")}))
    }, [])
  return <>
  <Container className="m-4">
    <h1>{poem?.title}</h1>
  <div>
    {poem?.tags?.map(t => <Tag key={t._id} word={t} filter={()=> {}}/>)}
  </div>
  <div dangerouslySetInnerHTML={{__html: poem?.text}}></div>
  </Container>
  </>
  
}
