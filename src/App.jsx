import { useState } from "react"
import Footer from "./components/Footer"
import LandingSection from "./sections/LandingSection"
import TableSection from "./sections/TableSection"

function App() {

  const boardsInfo = [['Cie', 'cie_grade_boundaries'],  ['Edexcel', 'edexcel_grade_boundaries'], ['AQA Oxford', 'aqaoxford_grade_boundaries']]
  
  const [board, setBoard] = useState(0)
  const [header, setHeader] = useState([])
  const [thresholds, setThresholds] = useState([])

  return (
    <div>
      <LandingSection 
        boardsInfo={boardsInfo}
        board={board}
        setBoard={setBoard}
        setHeader={setHeader}
        setThresholds={setThresholds}
      />
      <TableSection 
        header={header}
        thresholds={thresholds}
        setThresholds={setThresholds}
        boardsInfo={boardsInfo}
        board={board}
      />
      <Footer />
    </div>
  )
}

export default App