export const getPoems = async() => {
    let raw = await fetch("http://localhost:3001/poems")
    let poems = await raw.json()
    return poems
}