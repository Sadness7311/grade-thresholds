import { Input } from "../../components/ui/input"
import { ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"


function TableControls({ rowsOnOnePage, setRowsOnOnePage, setValue }) {
    return (
        <div className="flex gap-3 items-baseline w-full">
            <Input 
            className='max-w-max mr-auto'
            placeholder="Search all fields..." 
            onChange={e => setValue(e.target.value)} 
            />
            <DropdownMenu>
            <DropdownMenuTrigger className="flex cursor-pointer">
                { rowsOnOnePage } <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {
                [20, 50, 100].map((num, i) => 
                    <DropdownMenuItem className="cursor-pointer" onClick={() => setRowsOnOnePage(num)} key={i}>
                    { num }
                    </DropdownMenuItem>
                )
                }
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default TableControls