import "./Tag.scss"
export const Tag = ({word, filter}) => {
  return <><button onClick={()=> filter(word)} className="tag__main" style={{backgroundColor: word.color}}>{word.word}</button> </>
}
