import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTag, removeTag } from "../../app/reducers/poemsReducer"

import { RootState } from "../../app/store"
import "./Tag.scss"
interface TagProps {
  word: Tag
}
export const Tag: FC<TagProps> = ({ word }) => {
  const dispatch = useDispatch()
  const filters = useSelector((state: RootState) => state.poems.tags)
  const handleFilters = () => {
    filters.map((f) => f.word).includes(word.word)
      ? dispatch(removeTag(word))
      : dispatch(addTag(word))
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
