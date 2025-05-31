import { useEffect } from "react"
import SelectBoard from "./SelectBoard"
import Papa from 'papaparse'

function Boards({ boardsInfo, board, setBoard, setHeader, setThresholds }) {

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

    return (
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
    )
}

export default Boards