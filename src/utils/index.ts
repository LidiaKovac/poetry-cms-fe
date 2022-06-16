export const getQueryString = (queryObject:APIQuery):string => {
    let finalString = "?"
    Object.keys(queryObject).forEach((key, i) => {
        // if(i > 0 && queryObject[key as keyof APIQuery].size > 0) finalString += "&"
        let currentKey:Array<string> = []
        queryObject[key as keyof APIQuery].forEach(query => currentKey.push(query))
        let query = currentKey.join("+").replaceAll(" ", "%20")
        finalString += key + "=" + query + "&"

    })
    return finalString
}