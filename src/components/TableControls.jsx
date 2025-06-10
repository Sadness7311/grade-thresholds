import { Input } from "../../components/ui/input";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

function TableControls({
  header,
  sorting,
  setSorting,
  totalThresholds,
  value,
  setValue,
  rowsOnOnePage,
  setRowsOnOnePage,
}) {
  return (
    <div className="flex flex-wrap gap-3 items-baseline w-full">
      <Input
        placeholder="Search all fields..."
        value={value === undefined ? "" : value}
        onChange={(e) => setValue(e.target.value)}
      />
      <DropdownMenu>
        <DropdownMenuTrigger>
          Sort By <ChevronDown />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {header.map((item, i) => (
            <DropdownMenuItem
              className={i == sorting && "bg-accent"}
              onClick={() => setSorting(i)}
              key={i}
            >
              {item}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger>
          {rowsOnOnePage} <ChevronDown />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {[10, 20, 50, 100].map((num, i) => (
            <DropdownMenuItem onClick={() => setRowsOnOnePage(num)} key={i}>
              {num}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <h4 className="ml-auto">
        {value
          ? `Showing search results for "${value}"`
          : `Showing ${rowsOnOnePage} Rows out of ${totalThresholds} Rows`}
      </h4>
    </div>
  );
}

export default TableControls;
