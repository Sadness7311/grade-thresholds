import { Input } from "../../components/ui/input"
import { ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"


function TableControls({ header, sorting, setSorting, rowsOnOnePage, setRowsOnOnePage, setValue }) {
    return (
        <div className="flex gap-3 items-baseline w-full">
            <Input 
                className='max-w-max'
                placeholder="Search all fields..." 
                onChange={e => setValue(e.target.value)} 
            />
            <DropdownMenu className="mr-auto">
                <DropdownMenuTrigger>
                    Sort By <ChevronDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {
                    header.slice(1).map((item, i) => 
                        <DropdownMenuItem 
                            className={i == sorting && 'bg-accent'}
                            onClick={() => setSorting(i)} 
                            key={i}
                        >
                            { item }
                        </DropdownMenuItem>
                    )
                    }
                </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
            <DropdownMenuTrigger>
                { rowsOnOnePage } <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {
                [20, 50, 100].map((num, i) => 
                    <DropdownMenuItem onClick={() => setRowsOnOnePage(num)} key={i}>
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