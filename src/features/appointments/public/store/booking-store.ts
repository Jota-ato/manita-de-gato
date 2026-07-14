import { Customer, Extra } from "@/db/schema"
import { ServiceWithExtras } from "@/features/services/types/service.types"
import { create } from "zustand"

interface BookingStore {
    step: number
    setStep: (step: number) => void
    selectedService: ServiceWithExtras | null
    setSelectedService: (service: ServiceWithExtras | null) => void
    selectedExtras: Extra[]
    addExtra: (extra: Extra) => void
    removeExtra: (extra: Extra) => void
    timeConfirmationOpen: boolean
    setTimeConfirmationOpen: (open: boolean) => void
    time: { startTime: Date; endTime: Date } | null
    setTime: (time: { startTime: Date; endTime: Date } | null) => void
    customer: Customer | null
    setCustomer: (customer: Customer | null) => void
    openConfirmationDialog: boolean
    setOpenConfirmationDialog: (open: boolean) => void
}

export const useBookingStore = create<BookingStore>((set) => ({
    step: 1,
    setStep: (step) => set({ step }),
    selectedService: null,
    setSelectedService: (service) => set({ selectedService: service }),
    selectedExtras: [],
    addExtra: (extra) => set((state) => ({ selectedExtras: [...state.selectedExtras, extra] })),
    removeExtra: (extra) => set((state) => ({ selectedExtras: state.selectedExtras.filter(e => e !== extra) })),
    timeConfirmationOpen: false,
    setTimeConfirmationOpen: (open) => set({ timeConfirmationOpen: open }),
    time: null,
    setTime: (time) => set({ time }),
    customer: null,
    setCustomer: (user) => set({ customer: user }),
    openConfirmationDialog: false,
    setOpenConfirmationDialog: (open) => set({ openConfirmationDialog: open }),
}))