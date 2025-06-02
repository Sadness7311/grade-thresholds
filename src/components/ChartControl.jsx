import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'

function ChartControl({ code, component, setCode, setComponent, handleVisualize, message }) {
    return (
        <div className="w-full flex flex-wrap items-baseline gap-3">
            <Input 
                placeholder="subject code..." 
                value={code === undefined ? "" : code}
                onChange={e => setCode(e.target.value)}
            />
            <Input 
                placeholder="component... (For CIE only)"
                value={component === undefined ? '' : component}
                onChange={e => setComponent(e.target.value)}
            />
            <Button onClick={handleVisualize}>Visualize</Button>
            <h4 className="ml-auto">{ message }</h4>
        </div>
    )
}

export default ChartControl