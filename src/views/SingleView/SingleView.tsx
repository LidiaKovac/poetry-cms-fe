import { useEffect, useState } from "react"
import { Params, useParams } from "react-router-dom"
import { Container, Spinner } from "react-bootstrap"
import { getSingle } from "@API"
import "./SingleView.scss"
import { Tag } from "@components/Tag/Tag"
export const SingleView = () => {
  const { id }: Readonly<Params<string>> = useParams()
  const [poem, setPoem] = useState<Poem>({
    title: "",
    author: "",
    text: "",
    source: "",
    year: "",
    tags: [],
  })
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    getSingle(id as string).then((res) =>
      setPoem({
        ...res,
        text: res.text.replaceAll("\r", "<br>").replaceAll("\n", "<br>"),
      })
    )
  }, [])
  return <Container className="m-4">
    {loading ? (
      <div className="spinner__wrap">

        <Spinner className="spinner" animation="border" role="status"></Spinner>
      </div>
    ) : (
      <>
        <h1>{poem?.title}</h1>
        <div>
          {poem?.tags?.map((t) => (
            <Tag key={t._id} tag={t} />
          ))}
        </div>
        <div dangerouslySetInnerHTML={{ __html: poem?.text }}></div>
      </>
    )}
  </Container>
}
