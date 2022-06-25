import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTag, removeTag } from "../../app/reducers/queryReducer"

import { RootState } from "../../app/store"
import "./Tag.scss"
interface TagProps {
  tag: Tag
}
export const Tag: FC<TagProps> = ({ tag }) => {
  const dispatch = useDispatch()
  const filters = useSelector((state: RootState) => state.query.value.tags)
  const handleFilters = () => {
    [...filters].map((f) => {
      let currentFilter = f as Tag
      return currentFilter.word
    }).includes(tag.word)
      ? dispatch(removeTag(tag))
      : dispatch(addTag(tag))
  }
  return (
    <>
      <button
        onClick={() => handleFilters()}
        className="tag__main"
        style={{ backgroundColor: tag.color }}
      >
        {tag.word}
      </button>{" "}
    </>
  )
}
