import { useEffect, useState } from "react"
import ThresholdsTable from "./ThresholdsTable"
import { Input } from "../components/ui/input"

function App() {

  const [header, setHeader] = useState([])
  const [thresholds, setThresholds] = useState([])
  const [page, setPage] = useState(1)
  const [searchedThresholds, setSearchedThresholds] = useState([])
  const [value, setValue] = useState('')

  useEffect(() => {
    fetch("/cie_grade_boundaries.csv")
      .then(res => res.text())
      .then(csvText => {
        const lines = csvText.split('\n')
        const data = lines.map(line => line.split(','))
        setHeader(['No.', ...data[0]])
        setThresholds(data.slice(1))
      })
  }, [])

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
  }, [value])

  return (
    <div className="flex flex-col items-center text-center gap-5 py-10 px-2">
      <h1 className='mb-10'>Grade Boundaries Dataset</h1>

      <h2>CIE Table</h2>
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