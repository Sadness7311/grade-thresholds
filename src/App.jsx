import { useEffect, useState } from "react"
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
  const [searchedThresholds, setSearchedThresholds] = useState([])
  const [value, setValue] = useState('')

  useEffect(() => {
    setPage(1)
    setSearchedThresholds(
      thresholds.filter(row =>
        value
          .toLowerCase()
          .split(/[\s/]+/)
          .every(term =>
            row.some(cell =>
              cell.toString().toLowerCase().includes(term)
            )
          )
      )
    )
  }, [value, thresholds])

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
        rowsOnOnePage={rowsOnOnePage}
        setRowsOnOnePage={setRowsOnOnePage}
        setValue={setValue}
      />

      <ThresholdsTable 
        header={header}
        thresholds={
          value
            ? searchedThresholds.length
              ? searchedThresholds
              : []
            : thresholds
        } 
        rowsOnOnePage={rowsOnOnePage}
        page={page}
        setPage={setPage}
      />

      <Footer />
    </div>
  )
}

export default App