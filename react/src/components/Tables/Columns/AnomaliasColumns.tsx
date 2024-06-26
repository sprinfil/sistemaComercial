import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import IconButton from "../../ui/IconButton"
import { TrashIcon, Pencil2Icon, PlusCircledIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { useState } from "react"
import { useStateContext } from "../../../contexts/ContextAnomalias"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Anomalia = {
  id: number
  nombre: string
  descripcion: string
  estado: string
}


export const columns: ColumnDef<Anomalia>[] = [
  {
    accessorKey: "nombre",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const anomalia = row.original
      const { setAnomalia } = useStateContext();
      
      return (
        <div onClick={()=>setAnomalia(anomalia)}>
          <IconButton>
            <EyeOpenIcon />
          </IconButton>
        </div>
      )
    },
  },

]