"use client"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useState } from "react"
import FormAddPublication from "../FormAddPublication/FormAddPublication"
  
export default function ButtonAddPublication() {
    const [openDialog, setOpenDialog] = useState(false)
  return (
    <Dialog open={openDialog} >
        <DialogTrigger asChild>
            <Button variant="default" size="sm"  onClick={() => setOpenDialog(true)}><PlusCircle className="mr-2" />Create</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogDescription>
                    <FormAddPublication setOpenDialog={setOpenDialog}/>
                </DialogDescription>
            </DialogHeader>
        </DialogContent>

    </Dialog>
  )
}
