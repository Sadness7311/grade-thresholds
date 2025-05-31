import { useEffect, useMemo, useState } from "react"
import ThresholdsTable from "./components/ThresholdsTable"
import Nav from "./components/Nav"
import Footer from "./components/Footer"
import Boards from "./components/Boards"
import TableControls from "./components/TableControls"

function App() {

  const boardsInfo = [['Cie', 'cie_grade_boundaries'],  ['Edexcel', 'edexcel_grade_boundaries'], ['AQA Oxford', 'aqaoxford_grade_boundaries']]
  
  const [board, setBoard] = useState(0)
  const [header, setHeader] = useState([])
  const [thresholds, setThresholds] = useState([])
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
    <div className="w-full flex flex-col items-center text-center gap-3 px-2">
    
      <Nav />
      <h1 className="mt-20">Grade Boundaries</h1>
      <p className="max-w-2xl mx-auto">Grade boundaries for all exam boards! Useful to look up grade thresholds quickly for any year. If you find this useful, donate to us! </p>
      <Boards 
        boardsInfo={boardsInfo} 
        board={board} 
        setBoard={setBoard} 
        setHeader={setHeader}
        setThresholds={setThresholds}
      />


      <h2>{ boardsInfo[board][0] } Table</h2>
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

      <Footer />

    </div>
  )
}

export default App