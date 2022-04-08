import { Link } from "react-router-dom"

// import "./Single.scss"
export const Single = ({ poem }) => {
  return (
    <>
      {/* <tr>
        <th> Title </th>
        <th> Author </th>
        <th> Source </th>
        <th> Year </th>
      </tr> */}
      <tr>
      
          <td>{poem.title}</td>
          <td>{poem.author}</td>
          <td>{poem.source}</td>
          <td>{poem.year}</td>
          <td><Link to={"/" + poem._id}> HERE </Link></td>
      
      </tr>
    </>
  )
}
