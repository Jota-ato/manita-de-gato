"use client"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { useCustomerStore } from "../stores/customer-store";
import { CustomerForm } from "./customer-form";

export function EditCustomerDialog() {

    const { dialogOpen, setDialogOpen, setActiveCustomer, activeCustomer } = useCustomerStore()

    if (!activeCustomer) return null

    return (
        <Dialog
            open={dialogOpen}
            onOpenChange={() => {
                setActiveCustomer(null)
                setDialogOpen(false)
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editing {activeCustomer.name} {activeCustomer.lastName} customer</DialogTitle>
                </DialogHeader>
                <CustomerForm 
                    customer={activeCustomer}
                />
            </DialogContent>
        </Dialog>
    )
}