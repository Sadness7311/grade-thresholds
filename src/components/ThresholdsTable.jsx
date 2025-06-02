import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
} from "../../components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination"
import { memo, useMemo } from "react"
import ThresholdDrawer from "./ThresholdDrawer"
import { Atom, BookType, BriefcaseBusiness, Calculator, Code, FlaskConical, HandCoins, Leaf, Map, Pen, User } from "lucide-react"

function ThresholdsTable({ header, thresholds, rowsOnOnePage, page, setPage }) {

  const subjectIcons = [['math', <Calculator />], ['physics', <Atom />], ['computer', <Code />], ['bio', <Leaf />], ['business', <BriefcaseBusiness />], ['chemistry', <FlaskConical />], ['art', <Pen />], ['accounting', <User />], ['economics', <HandCoins />], ['english', <BookType />], ['geography', <Map />]]

  const currentThresholds = useMemo(() => {
    return thresholds.slice((page - 1) * rowsOnOnePage, page * rowsOnOnePage)
  }, [thresholds, page, rowsOnOnePage])

  const totalPages = useMemo(() => {
    return Math.ceil(thresholds.length / rowsOnOnePage)
  }, [rowsOnOnePage, thresholds])

  return header ? (
    <div className='w-full flex flex-col gap-4'>
      <Table>
        <TableHeader>
          <TableRow className='bg-accent text-base'>
            { ['No.', ...header, ''].map((head, i) => <TableHead key={i}>{ head.toUpperCase() }</TableHead>) }
          </TableRow>
        </TableHeader>
        <TableBody>
          { 
            currentThresholds.map((threshold, i) => {  
              return (
                <TableRow key={i}>
                  {
                    [i + 1, ...threshold.slice(0, header.length)].map((head, i) => 
                      <TableHead key={i}>
                        <div className="flex gap-2">
                          { head }
                          { subjectIcons.find(([key]) => String(head).toLowerCase().includes(key))?.[1] }
                        </div>
                      </TableHead>
                    )
                  }
                  <TableHead>
                    <ThresholdDrawer threshold={threshold} header={header} />
                  </TableHead>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => setPage(prev => Math.max(prev - 1, 1))} />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink onClick={() => setPage(1)} className={page === 1 ? 'bg-accent' : ''}>
              1
            </PaginationLink>
          </PaginationItem>

          {page > 3 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {[page - 1, page, page + 1].map(p =>
            p > 1 && p < totalPages ? (
              <PaginationItem key={p}>
                <PaginationLink onClick={() => setPage(p)} className={page === p ? 'bg-accent' : ''}>
                  {p}
                </PaginationLink>
              </PaginationItem>
            ) : null
          )}

          {page < totalPages - 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {totalPages > 1 && (
            <PaginationItem>
              <PaginationLink onClick={() => setPage(totalPages)} className={page === totalPages ? 'bg-accent' : ''}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  ) : (
    <h2>Loading...</h2>
  )
}

export default memo(ThresholdsTable)