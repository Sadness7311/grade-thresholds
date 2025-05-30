import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
} from "../components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination"
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { ChartColumnDecreasing } from 'lucide-react'


function ThresholdsTable({ header, thresholds, page, setPage }) {

  const rowsOnOnePage = 20
  const totalPages = Math.ceil(thresholds.length / rowsOnOnePage)

  const [currentThresholds, setCurrentThresholds] = useState([])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setCurrentThresholds(thresholds.slice((page - 1) * rowsOnOnePage, page * rowsOnOnePage))
  }, [thresholds, page])

  return header ? (
    <div className='w-full flex flex-col gap-5'>
      <Table>
        <TableHeader>
          <TableRow className='text-base bg-accent'>
            { header.map((head, i) => <TableHead key={i}>{ head }</TableHead>) }
          </TableRow>
        </TableHeader>
        <TableBody>
          { 
            currentThresholds.map((threshold, i) => 
              <TableRow key={i}>
                {
                  [i + 1, ...threshold].map((head, i) => 
                    <TableHead 
                      key={i} 
                      className={`${i == 2 && 'flex items-center gap-3'} ${i == 0 && 'text-base'}`}
                    >
                      { head }
                      { 
                        i === 2 && 
                          <Dialog>
                            <DialogTrigger className="cursor-pointer">
                              <ChartColumnDecreasing className='text-chart-2' size={20} />
                            </DialogTrigger>
                            <DialogContent>
                              <h2>Data for { head }</h2>
                              <p>Under development...</p>
                            </DialogContent>
                          </Dialog>
                      }
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

export default ThresholdsTable