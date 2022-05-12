import { FC } from "react"
import { Link } from "react-router-dom"
import { Tag } from "../Tag/Tag"

// import "./Single.scss"
interface SingleProps {
  poem: Poem,
}
export const Single:FC<SingleProps> = ({ poem }) => {
  return (
    <>
      <tr>
        <td>
          <strong>{poem.title}</strong>
        </td>
        <td>{poem.author}</td>
        <td>{poem.source}</td>
        <td>{poem.year}</td>
        <td>
          {poem.tags?.map((t:Tag) => (
            <Tag key={t._id} word={t} />
          ))}
        </td>
        <td>
          <Link to={"/" + poem._id}> HERE </Link>
        </td>
      </tr>
    </>
  )
}
