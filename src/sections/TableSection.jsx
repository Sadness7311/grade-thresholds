import { useEffect, useMemo, useState } from "react"
import TableControls from "../components/TableControls"
import ThresholdsTable from "../components/ThresholdsTable"

function TableSection({ header, thresholds, setThresholds, boardsInfo, board }) {

    const [rowsOnOnePage, setRowsOnOnePage] = useState(20)
    const [page, setPage] = useState(1)
    const [sorting, setSorting] = useState(2)
    const [value, setValue] = useState('')

    const searchedThresholds = useMemo(() => {
        setPage(1)
        return thresholds.filter(row =>
        value
            .toLowerCase()
            .split(/[\s/]+/)
            .every(term =>
            row.some(cell =>
                cell.toString().toLowerCase().includes(term)
            )
            )
        )
    }, [value, thresholds])

    useEffect(() => {
        setThresholds(prev => [...prev].sort((a, b) =>
        isNaN(a[sorting]) || isNaN(b[sorting])
            ? String(a[sorting]).localeCompare(String(b[sorting]))
            : b[sorting] - a[sorting]
        ))
    }, [board, sorting])

    return (
        <div className="w-full flex flex-col items-center gap-3 mt-20 px-4">
            <h2 className="mb-8">{ boardsInfo[board][0] } Table</h2>
            <TableControls 
                header={header}
                sorting={sorting}
                setSorting={setSorting}
                rowsOnOnePage={rowsOnOnePage}
                setRowsOnOnePage={setRowsOnOnePage}
                setValue={setValue}
            />
            <ThresholdsTable 
                header={header}
                thresholds={value ? searchedThresholds : thresholds}
                rowsOnOnePage={rowsOnOnePage}
                page={page}
                setPage={setPage}
            />
        </div>
    )
}

export default TableSection