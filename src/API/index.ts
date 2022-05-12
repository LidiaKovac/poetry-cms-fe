export const getPoems = async (query?:string):Promise<Array<Poem>> => {
  try {
    let raw = await fetch(
      "http://localhost:3001/poems" + (query ? "?" + query : "")
    )
    let poems = await raw.json()
    return poems
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getSingle = async (id:string):Promise<Poem> => {
  try {
    let raw = await fetch("http://localhost:3001/poems/single/" + id)
    let poems = await raw.json()
    return poems
  } catch (error) {
    console.error(error)
    return {} as Poem
  }
}
