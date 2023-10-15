import { faker } from "@/lib/faker.ts"
import type { CustomerModel } from "@/lib/db/models/customers.ts"

export function createRandomCustomer(): CustomerModel {
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