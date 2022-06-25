class Poem {
    author: string
    title: string
    text: string
    source: string
    year: string
    tags: Array<Tag>
    _id?: string
}

class Tag {
    word: string
    color: string
    overallOccurences: number
    yearlyOccurences: Array<YearlyOccurences>
    _id: string
}

class YearlyOccurences {
    year: string
    occurences: number
}

class APIQuery {
    source: string
    tags: Array<Tag>
    sort: string
    title: string
    page: number
}