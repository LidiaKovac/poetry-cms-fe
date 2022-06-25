export const getQueryString = (queryObject: APIQuery): string => {
    let finalString = "?"
    Object.keys(queryObject).forEach((key) => {
        let currentKey: Array<string> = []
        if (typeof queryObject[key as keyof APIQuery] === "string" || typeof queryObject[key as keyof APIQuery] === "number") {
            currentKey.push(queryObject[key as keyof APIQuery] as string)
        } else {
            //in case of tags
            let tags = queryObject[key as keyof APIQuery] as Array<Tag>
            let tagIds = tags.map(tag => tag._id)
            tagIds.forEach(query => currentKey.push(query))
        }
        let query = currentKey.join("+").replaceAll(" ", "%20")
        finalString += key + "=" + query + "&"

    })
    return finalString + "size=15"
}