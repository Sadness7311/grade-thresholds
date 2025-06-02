import Section from "./Section"
import { useEffect, useState } from "react"
import select from "../functions/select"
import ThresholdsLineChart from "../components/ThresholdsLineChart"
import ChartControl from "../components/ChartControl"

function GraphsSection({ header, thresholds, board }) {

    const defaultChart = {
        data: [],
        config: {
            showDots: false
        }
    }
    const defaultMessage = 'Enter subject code to visualize.'

    const [inputCode, setCode] = useState('')
    const [inputComponent, setComponent] = useState('')
    const [chart, setChart] = useState(defaultChart)
    const [message, setMessage] = useState(defaultMessage)

    useEffect(() => {
        setCode('')
        setComponent('')
        setMessage(defaultMessage)
        setChart(defaultChart)
    }, [board])

    function handleVisualize() {
        
        if (!inputCode) {
            setMessage('No code provided.')
            return
        }
        if (board === 0 && !inputComponent) {
            setMessage('Component is required for CIE.')
            return
        }
        const filteredThresholds = thresholds
            .filter(threshold =>
                threshold[select(header, 'code')] == inputCode &&
                (board === 0 ? threshold[3] == inputComponent : true)
            )
            .sort((a, b) => new Date('1-' + a[2]) - new Date('1-' + b[2]))

        if (!filteredThresholds.length) {
            setMessage(`No rows found with this subject code${board === 0 ? ' and component.' : '.'}`)
            setChart(defaultChart)
            return
        }

        setMessage(`Showing chart for ${inputCode} with component ${inputComponent}`)
        
        const slicedHeader = header.slice(5, header.length)

        const data = filteredThresholds.map(threshold => {
            const values = threshold.slice(5, header.length)
            const grades = Object.fromEntries(
                slicedHeader.map((key, i) => [key.toLowerCase(), values[i]])
            )
            return {
                year: threshold[select(header, board === 0 ? 'series' : 'year')],
                ...grades
            }
        })


        const colors = ["#DC1D64", '#8D33FF', '#1d2adc', '#FFC300', '#dc1d1d', 'lightblue', 'lightgreen', 'black']
        const config = Object.fromEntries(
            slicedHeader.map((head, i) => [
                head.toLowerCase(),
                { label: head.toUpperCase(), color: colors[i] }
            ])
        )
        
        setChart({
            data, config
        })
    }

    return (
        <Section className="mt-20">
            <h2 className="mb-8">Graphs</h2>
            <ChartControl 
                code={inputCode}
                component={inputComponent}
                message={message}
                setCode={setCode}
                setComponent={setComponent}
                handleVisualize={handleVisualize}
            />
            <ThresholdsLineChart 
                chart={chart}
            />
        </Section>
    )
}

export default GraphsSection