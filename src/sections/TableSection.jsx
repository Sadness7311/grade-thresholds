import { useEffect, useMemo, useState } from "react"
import TableControls from "../components/TableControls"
import ThresholdsTable from "../components/ThresholdsTable"
import Section from "./Section"

function TableSection({ header, thresholds, setThresholds, boardsInfo, board }) {

    const [rowsOnOnePage, setRowsOnOnePage] = useState(20)
    const [page, setPage] = useState(1)
    const [sorting, setSorting] = useState(0)
    const [value, setValue] = useState('')

    const searchedThresholds = useMemo(() => {
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
    }, [sorting])

    useEffect(() => {
        setPage(1)
        setSorting(-1)
        setValue('')
    }, [board])

    return (
        <Section className="mt-20">
            <h2 className="mb-8">{ boardsInfo[board][0] } Table</h2>
            <TableControls 
                header={header}
                totalThresholds={thresholds.length}
                value={value}
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
        </Section>
    )
}

export default TableSection