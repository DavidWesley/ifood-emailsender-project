import { InMemoryTable, InMemoryTableModel } from "../in-memory-table.ts"
import { Validators } from "../validators/index.ts"

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
        ["features", { validators: [Validators.isArray] }]
    ]
})