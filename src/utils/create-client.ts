import { faker } from "@/lib/faker.ts"
import type { ClientModel } from "@/lib/db/models/clients.ts"

export function createRandomClient(): ClientModel {
    const person = faker.person

    const options = {
        firstName: person.firstName(),
        lastName: person.lastName()
    }

    return {
        name: person.fullName(options),
        email: faker.internet.email(options).toLowerCase(),
        subscriptionTier: faker.helpers.arrayElement(["true", "false"]),
    }
}