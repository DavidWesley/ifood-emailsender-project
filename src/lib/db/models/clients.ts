import { Validators } from "@/lib/db/validators/index.ts"
import { InMemoryTable, InMemoryTableModel } from "../in-memory-table.ts"

export interface ClientModel extends Partial<InMemoryTableModel> {
    name: string
    email: string
    subscriptionTier: string
}

export const clients = new InMemoryTable<ClientModel>("clients", {
    columns: [
        ["name", { validators: [Validators.isValidName] }],
        ["email", { validators: [Validators.isEmail] }],
        ["subscriptionTier", { validators: [Validators.isBoolean] }]
    ]
})
