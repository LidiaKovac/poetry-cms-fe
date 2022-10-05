import { getQueryString } from "../utils"
export const login = async (id:string | null) => {
  localStorage.setItem("user", id!)
  let raw = await fetch(
    process.env.REACT_APP_BE_URL + "/user/me", {
      headers: {
        authorization: id!
      }
    }
  )
}

export const addNewPoem = async(formData:FormData) => {
  let raw = await fetch(
    process.env.REACT_APP_BE_URL + "/poems/" + formData.get("type"), {
      method: "POST",
      headers: {
        authorization: localStorage.getItem("user") || ""
      },
      body: formData
    }
  )
}

export const logout = () => {
  localStorage.removeItem("user")
  window.location.assign("/login")
}

export const getPoems = async (query?: APIQuery): Promise<{poems: Array<Poem>, count: number}> => {
  try {
    let q = ""
    if (query) {
      q = getQueryString(query as APIQuery)
    }

    let raw = await fetch(
      process.env.REACT_APP_BE_URL + "/poems" + (q.length > 0 ? q : ""), {
        headers: {
          authorization: localStorage.getItem("user") || ""
        }
      }
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
    let res = await fetch(process.env.REACT_APP_BE_URL + "/poems/count", {
      headers: {
        authorization: localStorage.getItem("user") || ""
      }
    })
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
      process.env.REACT_APP_BE_URL + "/poems/source/" + source, {
        headers: {
          authorization: localStorage.getItem("user") || ""
        }
      }
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
    let raw = await fetch(process.env.REACT_APP_BE_URL + "/poems/single/" + id, {
      headers: {
        authorization: localStorage.getItem("user") || ""
      }
    })
    let poems = await raw.json()
    return poems
  } catch (error) {
    console.error(error)
    return {} as Poem
  }
}
