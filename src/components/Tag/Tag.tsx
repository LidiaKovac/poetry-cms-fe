import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { add as addFilter, remove as removeFilter } from "../../app/reducers/filtersReducer"
import { RootState } from "../../app/store"
import "./Tag.scss"
interface TagProps {
  word: Tag
}
export const Tag:FC<TagProps> = ({ word }) => {
  const dispatch = useDispatch()
  const filters = useSelector((state:RootState)=> state.filters.value)
  const handleFilters = () => {
    filters.map(f => f.word).includes(word.word) ? dispatch(removeFilter(word)) : dispatch(addFilter(word))
  }
  return (
    <>
      <button
        onClick={() => handleFilters()}
        className="tag__main"
        style={{ backgroundColor: word.color }}
      >
        {word.word}
      </button>{" "}
    </>
  )
}
