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
      <h1 className='mb-15'>Grade Boundaries Dataset</h1>

      <h2>CIE Table</h2>
      <ThresholdsTable 
        header={thresholds.length && ['', ...thresholds[0]]}
        thresholds={thresholds.slice(1)} 
      />
    </div>
  )
}

export default App