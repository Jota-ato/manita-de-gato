"use client"
import { Customer } from "@/db/schema"
import { Heading } from "@/shared/components/typography/heading"
import { formatPhone } from "@/shared/utils/phone"
import { PenSquare } from "lucide-react"
import { useCustomerStore } from "../stores/customer-store"

export function CustomerHeader({
    customer
}: {
    customer: Customer
}) {

    const { setActiveCustomer, setDialogOpen } = useCustomerStore()

    return (
        <header className="border-b pb-4">
            <Heading className="text-3xl! text-left font-semibold tracking-tight flex items-center gap-2">
                {`${customer.name} ${customer.lastName}`}
                <PenSquare
                    className="cursor-pointer text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => {
                        setActiveCustomer(customer)
                        setDialogOpen(true)
                    }}
                    strokeWidth={2.5}
                />
            </Heading>
            <p className="text-muted-foreground mt-1">
                {formatPhone(customer.phone)}
            </p>
        </header>
    )
}