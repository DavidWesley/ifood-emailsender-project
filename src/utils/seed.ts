import { database } from "@/lib/db/db.ts"
import { createRandomCustomer } from "@/utils/create-customers.ts"
import { createRandomVehicle } from "@/utils/create-vehicles.ts"

/**
 * Seeds the database with a specified number of random customers.
 *
 * @param {number} quantity - The number of random customers to generate and insert into the database. Must be between 1 and 1e6 (inclusive).
 * @return {void} This function does not return anything.
 */
export const populateCustomers = (quantity: number): void => {
    if (quantity < 1 || quantity > 1e4) {
        throw new RangeError("count must be between 1 and 1e4 (inclusive)")
    }

    for (let i = 0; i < quantity; i += 1) {
        const customer = createRandomCustomer()
        database.customers.insert(customer)
    }
}

export const populateVehicles = (quantity: number): void => {
    if (quantity < 1 || quantity > 1e3) {
        throw new RangeError("count must be between 1 and 1e3 (inclusive)")
    }

    for (let i = 0; i < quantity; i += 1) {
        const vehicle = createRandomVehicle()
        database.vehicles.insert(vehicle)
    }
}
