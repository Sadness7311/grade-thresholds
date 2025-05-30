import { useEffect, useState } from "react"
import ThresholdsTable from "./ThresholdsTable"
import { Input } from "../components/ui/input"
import { Code, ExternalLink } from "lucide-react"
import SelectBoard from "./SelectBoard"
import Papa from 'papaparse'

function App() {

  const boardsInfo = [['Cie', 'cie_grade_boundaries'],  ['Edexcel', 'edexcel_grade_boundaries'], ['AQA Oxford', 'aqaoxford_grade_boundaries']]
  
  const [board, setBoard] = useState(0)
  const [header, setHeader] = useState([])
  const [thresholds, setThresholds] = useState([])
  const [page, setPage] = useState(1)
  const [searchedThresholds, setSearchedThresholds] = useState([])
  const [value, setValue] = useState('')

  useEffect(() => {
    fetch(`/${boardsInfo[board][1]}.csv`)
      .then(res => res.text())
      .then(csvText => {
        const parsed = Papa.parse(csvText.trim(), { skipEmptyLines: true })
        const data = parsed.data
        setHeader(['No.', ...data[0]])
        setThresholds(data.slice(1))
      })
  }, [board])

  useEffect(() => {
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
  }, [value])

  return (
    <div className="w-full flex flex-col items-center text-center gap-5 px-2 pb-10">
    
      <div className="flex items-center justify-end gap-8 px-4 w-full py-5 border-b-1 border-accent sm:px-12">
        <p className="flex gap-2">Donate <ExternalLink /></p>
        <p>Documentation</p>
        <p className="flex gap-2">API <Code /></p>
      </div>

      <h1 className="mt-20">Grade Boundaries</h1>
      <p className="max-w-2xl mx-auto">Grade boundaries for all exam boards! Useful to look up grade thresholds quickly for any year. If you find this useful, donate to us! </p>
      <div className="w-full flex justify-center flex-wrap gap-3 mb-20">
        { 
          boardsInfo.map((boardInfo, i) => 
            <SelectBoard 
              name={boardInfo[0]} 
              boardIndex={i}
              board={board}
              onClick={() => setBoard(i)}
            />
          )
        }
      </div>

      <h2>{ boardsInfo[board][0] } Table</h2>
      <div className="flex items-baseline w-full">
        <Input 
          className='max-w-max'
          placeholder="Search all fields..." 
          onChange={e => setValue(e.target.value)} 
        />
      </div>
      <ThresholdsTable 
        header={header}
        thresholds={
          value
            ? searchedThresholds.length
              ? searchedThresholds
              : []
            : thresholds
        } 
        page={page}
        setPage={setPage}
      />
    </div>
  )
}

export default App