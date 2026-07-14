import { Customer } from "@/db/schema"
import { create } from "zustand"

interface CustomerStore {
    dialogOpen: boolean,
    setDialogOpen: (open: boolean) => void
    activeCustomer: Customer | null
    setActiveCustomer: (customer: Customer | null) => void
}

export const useCustomerStore = create<CustomerStore>((set) => ({
    dialogOpen: false,
    setDialogOpen: (open) => set({ dialogOpen: open }),
    activeCustomer: null,
    setActiveCustomer: (customer) => set({ activeCustomer: customer })
}))