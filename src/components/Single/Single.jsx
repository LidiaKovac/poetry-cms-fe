import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Tag } from "../Tag/Tag"

// import "./Single.scss"
export const Single = ({ poem, filterBy }) => {
  return (
    <>
      {/* <tr>
        <th> Title </th>
        <th> Author </th>
        <th> Source </th>
        <th> Year </th>
      </tr> */}
      <tr>
      
          <td><strong>{poem.title}</strong></td>
          <td>{poem.author}</td>
          <td>{poem.source}</td>
          <td>{poem.year}</td>
          <td>{poem.tags?.map(t => <Tag key={t._id} word={t} filter={filterBy}/> )}</td>
          <td><Link to={"/" + poem._id}> HERE </Link></td>
      
      </tr>
    </>
  )
}
