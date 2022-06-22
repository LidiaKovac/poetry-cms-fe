import { getQueryString } from "../utils"


export const getPoems = async (query?: APIQuery, page = 1): Promise<Array<Poem>> => {
  try {
    console.log(query);
    let q = ""
    if (query) {
      q = getQueryString(query as APIQuery, page)
      console.log(q);
    }

    let raw = await fetch(
      process.env.REACT_APP_BE_URL + (q.length > 0 ? q : "")
    )
    let poems = await raw.json()
    return poems
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getCount = async (): Promise<number> => {
  let count = 0
  try {
    let res = await fetch(process.env.REACT_APP_BE_URL + "/count")
    let {count: found} = await res.json()
    
    
    count = found
  } catch (error) {
    console.log(error)
  }
  return count
}

export const getPoemsBySource = async (source?: string): Promise<Array<Poem>> => {
  try {
    let raw = await fetch(
      process.env.REACT_APP_BE_URL + "/source/" + source
    )
    let poems = await raw.json()
    return poems
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getSingle = async (id: string): Promise<Poem> => {
  try {
    let raw = await fetch(process.env.REACT_APP_BE_URL + "/single/" + id)
    let poems = await raw.json()
    return poems
  } catch (error) {
    console.error(error)
    return {} as Poem
  }
}
