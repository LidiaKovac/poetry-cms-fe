export const getPoems = async (query) => {
  try {
    let raw = await fetch(
      "http://localhost:3001/poems" + (query ? "?" + query : "")
    )
    let poems = await raw.json()
    return poems
  } catch (error) {
    console.error(error)
  }
}

export const getSingle = async (id) => {
  try {
    let raw = await fetch("http://localhost:3001/poems/single/" + id)
    let poems = await raw.json()
    return poems
  } catch (error) {
    console.error(error)
  }
}
