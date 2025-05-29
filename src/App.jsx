import { useEffect, useState } from "react"
import ThresholdsTable from "./ThresholdsTable"

function App() {

  const [thresholds, setThresholds] = useState([])

  useEffect(() => {
    fetch("/cie_grade_boundaries.csv")
      .then(res => res.text())
      .then(csvText => {
        const lines = csvText.split('\n')
        const data = lines.map(line => line.split(','))
        setThresholds(data)
      })
  }, [])

  return (
    <div className="flex flex-col items-center text-center gap-5 py-10 px-2">
      <h1>Cambridge International (CIE) AS & A-Level Grade Boundaries Dataset (2021 – 2025)</h1>
      <p className='text-[grey] mb-6'>Website developed by <a href="https://github.com/Sadness7311">Sadness7311</a>, Dataset provided by <a href="https://github.com/ChessMastermind/">ChessMastermind</a>.</p>

      <ThresholdsTable 
        header={thresholds[0]}
        thresholds={thresholds.slice(1)} 
      />
    </div>
  )
}

export default App