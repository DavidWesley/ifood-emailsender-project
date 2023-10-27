import { Validators } from "../lib/in-memory-table/validators/validators.ts"
import { InMemoryTable, InMemoryTableModel } from "../lib/in-memory-table/in-memory-table.ts"

export interface CustomerModel extends Partial<InMemoryTableModel> {
    name: string
    email: string
    subscriptionTier: string
    lastVisitAt: string
}

export const customers = new InMemoryTable<CustomerModel>("customers", {
    columns: [
        ["name", { validators: [Validators.isValidName] }],
        ["email", { validators: [Validators.isEmail] }],
        ["subscriptionTier", { validators: [Validators.isBoolean] }],
        ["lastVisitAt", { validators: [Validators.isDateTimeString] }],
    ],
})
