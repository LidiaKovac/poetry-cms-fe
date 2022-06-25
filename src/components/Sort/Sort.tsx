import { FC } from "react"
interface SortProps {
    queries: APIQuery,
    sort: string
}
export const Sort: FC<SortProps> = ({ queries, sort }) => {
    return (
        <span>
            {queries.sort.includes(sort + "_asc") ? " 🔼 " : queries.sort.includes(sort + "_desc") ?  " 🔽 " : ""}
        </span>
    )
}