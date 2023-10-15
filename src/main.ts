import { database } from "@/lib/db/db.ts"
import { CustomerModel } from "@/lib/db/models/customers.ts"
import { sendEmail } from "@/lib/email.ts"

import { getWeekDayFullName } from "@/utils/dates.ts"
import { generateEmailBody } from "@/utils/emails.ts"
import { populateCustomers } from "@/utils/seed.ts"

function main(): void {
    // Generate some random customers
    populateCustomers(10)

    // Get the customers table who accept the subscription
    const customers: CustomerModel[] = database.customers
        .select({
            filters: {
                subscriptionTier: (value: string) => value === "true"
            }
        })
        .map((customer) => {
            return {
                name: customer.get("name")!,
                email: customer.get("email")!,
                subscriptionTier: customer.get("subscriptionTier")!
            } as CustomerModel
        })

    // Mon Oct 16 2023 12: 30:00 GMT-0300 (Horário Padrão de Brasília)
    const date = new Date(2023, 9, 16, 12, 30, 0) // Monday

    const weekdayFullName = getWeekDayFullName(date, "pt-BR").toLowerCase().trim()

    // Trigger emails to customers on the selected date and weekday
    if (weekdayFullName === "segunda-feira") {
        customers.forEach((customer) => {
            const result = sendEmail(
                customer.email,
                "Novidades e Ofertas Especiais da CarStore esta Semana!",
                generateEmailBody({ customer })
            )

            console.log(result.status + ": " + result.message)
        })
    }
}

console.time("main")

main()

console.timeEnd("main")
