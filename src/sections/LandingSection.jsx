import Boards from "../components/Boards"
import Nav from "../components/Nav"

function LandingSection({ boardsInfo, board, setBoard, setHeader, setThresholds }) {
    return (
        <div className="w-full flex flex-col items-center gap-5 text-center">
            <Nav />
            <h1 className="mt-25">Grade Boundaries</h1>
            <p className="max-w-2xl mx-2">Grade boundaries for all exam boards! Useful to look up grade thresholds quickly for any year. If you find this useful, donate to us! </p>
            <Boards 
                boardsInfo={boardsInfo} 
                board={board} 
                setBoard={setBoard} 
                setHeader={setHeader}
                setThresholds={setThresholds}
            />
        </div>
    )
}

export default LandingSection