import { getQueryString } from "../utils"


export const getPoems = async (query?: APIQuery): Promise<{poems: Array<Poem>, count: number}> => {
  try {
    let q = ""
    if (query) {
      q = getQueryString(query as APIQuery)
    }

    let raw = await fetch(
      process.env.REACT_APP_BE_URL + (q.length > 0 ? q : "")
    )
    let poems = await raw.json()
    return poems
  } catch (error) {
    console.error(error)
    return {poems: [], count: 0}
  }
}

export const getCount = async (): Promise<number> => {
  let count = 0
  try {
    let res = await fetch(process.env.REACT_APP_BE_URL + "/count")
    let {count: found} = await res.json()
    
    
    count = found
  } catch (error) {
    console.error(error)
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
