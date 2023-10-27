import { InMemoryTable, InMemoryTableModel } from "../lib/in-memory-table/in-memory-table.ts"
import { Validators } from "../lib/in-memory-table/validators/validators.ts"

export interface VehicleModel extends Partial<InMemoryTableModel> {
    model: string
    type: string
    manufacturer: string
    fuel: string
    year: string
    mark: string
    price: string
    features: string
}

export const vehicles = new InMemoryTable<VehicleModel>("vehicles", {
    columns: [
        ["model", { validators: [Validators.isValidName] }],
        ["type", { validators: [Validators.isValidName] }],
        ["manufacturer", { validators: [Validators.isValidName] }],
        ["fuel", { validators: [Validators.isValidName] }],
        ["year", { validators: [Validators.isNumber] }],
        ["mark", { validators: [Validators.isValidName] }],
        ["price", { validators: [Validators.isNumber] }],
        ["features", { validators: [Validators.isArray] }],
    ],
})
