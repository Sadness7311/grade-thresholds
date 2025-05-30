import { useEffect, useState } from "react"
import ThresholdsTable from "./ThresholdsTable"
import { Input } from "../components/ui/input"
import { ChevronDown } from "lucide-react"
import SelectBoard from "./SelectBoard"
import Papa from 'papaparse'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import Nav from "./Nav"
import { Button } from "../components/ui/button"
import Footer from "./Footer"

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
    <div className="w-full flex flex-col items-center text-center gap-5 px-2">
    
      <Nav />

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
              key={i}
            />
          )
        }
      </div>

      <h2>{ boardsInfo[board][0] } Table</h2>
      <div className="flex gap-3 items-baseline w-full">
        <Input 
          className='max-w-max mr-auto'
          placeholder="Search all fields..." 
          onChange={e => setValue(e.target.value)} 
        />
        <DropdownMenu>
          <DropdownMenuTrigger>
              <Button variant="ghost">{ rowsOnOnePage } <ChevronDown /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {
              [20, 50, 100].map((num, i) => 
                <DropdownMenuItem className="cursor-pointer" onClick={() => setRowsOnOnePage(num)} key={i}>
                  { num }
                </DropdownMenuItem>
              )
            }
          </DropdownMenuContent>
        </DropdownMenu>
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
        rowsOnOnePage={rowsOnOnePage}
        page={page}
        setPage={setPage}
      />

      <Footer />
    </div>
  )
}

export default App