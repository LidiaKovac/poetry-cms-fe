import { FC } from "react"
import { Link } from "react-router-dom"
import { Tag } from "components/Tag/Tag"

interface SingleProps {
  poem: Poem,
  i: number
}
export const Single:FC<SingleProps> = ({ poem,i }) => {
  return (
    <>
      <tr>
        <td>{i + 1}</td>
        <td>
          <strong>{poem.title}</strong>
        </td>
        <td>{poem.author}</td>
        <td>{poem.source}</td>
        <td>{poem.year}</td>
        <td>
          {poem.tags?.map((t:Tag) => (
            <Tag key={t._id} tag={t} />
          ))}
        </td>
        <td>
          <Link to={"/" + poem._id}> HERE </Link>
        </td>
      </tr>
    </>
  )
}
