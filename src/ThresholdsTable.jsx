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
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer"
import { ChartNoAxesColumnIncreasing } from 'lucide-react'
import ThresholdChart from "./ThresholdChart"


function ThresholdsTable({ header, thresholds, page, setPage }) {

  const rowsOnOnePage = 20
  const totalPages = Math.ceil(thresholds.length / rowsOnOnePage)

  const [currentThresholds, setCurrentThresholds] = useState([])

  useEffect(() => {
    setCurrentThresholds(thresholds.slice((page - 1) * rowsOnOnePage, page * rowsOnOnePage))
  }, [thresholds, page])

  return header ? (
    <div className='w-full flex flex-col gap-5'>
      <Table>
        <TableHeader>
          <TableRow className='bg-accent text-base'>
            { header.map((head, i) => <TableHead key={i}>{ head.toUpperCase() }</TableHead>) }
          </TableRow>
        </TableHeader>
        <TableBody>
          { 
            currentThresholds.map((threshold, i) => {  
              return (
                <TableRow key={i}>
                  {
                    [i + 1, ...threshold.slice(0, header.length)].map((head, i) => 
                      <TableHead 
                        key={i} 
                        className={`${i == 2 && 'flex items-center gap-3'} ${i == 0 && 'text-base'}`}
                      >
                        { head }
                        { 
                          i === 2 && 
                            <Drawer>
                              <DrawerTrigger className="cursor-pointer">
                                <ChartNoAxesColumnIncreasing size={20} />
                              </DrawerTrigger>
                              <DrawerContent className='flex items-center gap-3 text-center p-2'>
                                <DrawerTitle>
                                  { threshold.slice(0, 4).join('/') }
                                </DrawerTitle>
                                <DrawerDescription>
                                  Histogram comparing marks for all grades and max marks.
                                </DrawerDescription>

                                <ThresholdChart threshold={threshold} header={header} /> 
                              </DrawerContent>
                            </Drawer>
                        }
                      </TableHead>
                    )
                  }
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

export default ThresholdsTable