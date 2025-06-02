import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer"
import { PanelBottom } from 'lucide-react'
import ThresholdChart from "./ThresholdChart"

function ThresholdDrawer({ threshold, header }) {
    return (
        <Drawer>
          <DrawerTrigger className="cursor-pointer">
            <PanelBottom />
          </DrawerTrigger>
          <DrawerContent className='flex items-center gap-3 text-center p-2'>
            <DrawerTitle>
              Row Information
            </DrawerTitle>
            <DrawerDescription>
              Histogram comparing marks for all grades and max marks.
            </DrawerDescription>
            <ThresholdChart threshold={threshold} header={header} /> 
          </DrawerContent>
        </Drawer>
    )
}

export default ThresholdDrawer