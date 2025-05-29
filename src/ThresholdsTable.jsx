import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
} from "../components/ui/table"

function ThresholdsTable() {

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

  return thresholds.length ? (
    <Table>
      <TableBody>
        { 
          thresholds.map((threshold, i) => 
            <TableRow key={i}>
              {
                threshold.map((head, i) => 
                  <TableHead key={i}>
                    { head }
                  </TableHead>
                )
              }
            </TableRow>
          )
        }
      </TableBody>
    </Table>
  ) : (
    <span>Loading...</span>
  )
}

export default ThresholdsTable