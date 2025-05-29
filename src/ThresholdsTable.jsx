import {
  Table,
  TableBody,
  TableHead,
  TableRow,
} from "../components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination"
import { useEffect, useState } from "react"

function ThresholdsTable({ thresholds }) {

  const totalPages = Math.ceil(thresholds.length / 200)

  const [currentThresholds, setCurrentThresholds] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    setCurrentThresholds(thresholds.slice((page - 1) * 200, page * 200))
    window.scrollTo(0, 0)
  }, [thresholds, page])

  return currentThresholds.length ? (
    <div className='w-full flex flex-col gap-5'>
      <h2>Current Page: { page }</h2>
      <Table>
        <TableBody>
          { 
            currentThresholds.map((threshold, i) => 
              <TableRow key={i}>
                {
                  [i + 1, ...threshold].map((head, i) => 
                    <TableHead key={i}>
                      { head }
                    </TableHead>
                  )
                }
              </TableRow>
            )
          }
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => setPage(prev => prev > 1 ? prev - 1 : 1)} />
          </PaginationItem>
          <PaginationItem>
            { 
              Array.from({ length: totalPages }).map((_, i) => 
                <PaginationLink onClick={() => setPage(i + 1)} className={page === i + 1 && 'bg-accent'}>
                  { i + 1 }
                </PaginationLink>
              )
            }
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={() => setPage(prev => prev < totalPages ? prev + 1 : totalPages)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  ) : (
    <span>Loading...</span>
  )
}

export default ThresholdsTable