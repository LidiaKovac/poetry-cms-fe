import { getQueryString } from "../utils"

export const getPoems = async (query?: APIQuery): Promise<Array<Poem>> => {
  try {
    console.log(query);
    let q = ""
    if (query) {
      q = getQueryString(query as APIQuery)
      console.log(q);
    }

    let raw = await fetch(
      "http://localhost:3001/poems" + (q.length > 0 ? q : "")
    )
    let poems = await raw.json()
    return poems
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getPoemsBySource = async (source?: string): Promise<Array<Poem>> => {
  try {
    let raw = await fetch(
      "http://localhost:3001/poems/source/" + source
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
    let raw = await fetch("http://localhost:3001/poems/single/" + id)
    let poems = await raw.json()
    return poems
  } catch (error) {
    console.error(error)
    return {} as Poem
  }
}
