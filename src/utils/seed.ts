import { createRandomClient } from "@/utils/create-client.ts"
import { database } from "@/lib/db/db.ts"

/**
 * Seeds the database with a specified number of random clients.
 *
 * @param {number} quantity - The number of random clients to generate and insert into the database. Must be between 1 and 1e6 (inclusive).
 * @return {void} This function does not return anything.
 */
export const populateClients = (quantity: number): void => {
    if (quantity < 1 || quantity > 1e6) {
        throw new RangeError("count must be between 1 and 1e6 (inclusive)")
    }

    for (let i = 0; i < quantity; i += 1) {
        const client = createRandomClient()
        database.clients.insert(client)
    }
}