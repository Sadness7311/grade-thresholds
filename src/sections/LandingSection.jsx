import Boards from "../components/Boards"
import Nav from "../components/Nav"
import Section from "./Section"

function LandingSection({ boardsInfo, board, setBoard, setHeader, setThresholds }) {
    return (
        <Section className="text-center gap-5">
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
        </Section>
    )
}

export default LandingSection