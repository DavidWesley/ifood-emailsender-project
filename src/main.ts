import { database } from "@/database/database.ts"
import { sendEmail } from "@/lib/email.ts"

import { getWeekDayFullName, isFirstDateInPreviousMonth } from "@/utils/dates.ts"
import { SendEmailBodyProps, generateEmailBody } from "@/utils/email-helpers.ts"
import { populateCustomers, populateVehicles } from "@/utils/seed.ts"

function main(): void {
    // Generate some random customers
    populateCustomers(10)

    // Generate some random customers
    populateVehicles(100)

    // Mon Oct 16 2023 12: 30:00 GMT-0300 (Horário Padrão de Brasília)
    const date = new Date(2023, 9, 16, 12, 30, 0) // Monday

    // Get the customers table who accept the subscription
    const customers: Array<SendEmailBodyProps["customer"]> = database.customers
        .select({
            filters: {
                subscriptionTier: (value: string) => value === "true",
                lastVisitAt: (value: string) => isFirstDateInPreviousMonth(value, date.toISOString()),
            },
            columns: ["name", "email"],
        })
        .map((customer) => Object.fromEntries(customer) as SendEmailBodyProps["customer"])

    const weekdayFullName = getWeekDayFullName(date, "pt-BR").toLowerCase().trim()

    // Trigger emails to customers on the selected date and weekday
    if (weekdayFullName === "segunda-feira") {
        customers.forEach((customer) => {
            const result = sendEmail(customer.email, "Novidades e Ofertas Especiais da CarStore esta Semana!", generateEmailBody({ customer }))

            console.log(result.status + ": " + result.message)
        })
    }
}

console.time("main")

main()

console.timeEnd("main")
