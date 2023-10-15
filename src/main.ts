import { database } from "@/lib/db/db.ts"
import { ClientModel } from "@/lib/db/models/clients.ts"
import { sendEmail } from "@/lib/email.ts"

import { getWeekDayFullName } from "@/utils/dates.ts"
import { generateEmailBody } from "@/utils/emails.ts"
import { populateClients } from "@/utils/seed.ts"

function main(): void {
    // Generate some random clients
    populateClients(10)

    // Get the clients table who accept the subscription
    const clients: ClientModel[] = database.clients
        .select({
            filters: {
                subscriptionTier: (value: string) => value === "true"
            }
        })
        .map((client) => {
            return {
                name: client.get("name")!,
                email: client.get("email")!,
                subscriptionTier: client.get("subscriptionTier")!
            } as ClientModel
        })

    // Mon Oct 16 2023 12: 30:00 GMT-0300 (Horário Padrão de Brasília)
    const date = new Date(2023, 9, 16, 12, 30, 0) // Monday

    const weekdayFullName = getWeekDayFullName(date, "pt-BR").toLowerCase().trim()

    // Trigger emails to clients on the selected date and weekday
    if (weekdayFullName === "segunda-feira") {
        clients.forEach((client) => {
            const result = sendEmail(
                client.email,
                "Novidades e Ofertas Especiais da CarStore esta Semana!",
                generateEmailBody({ client })
            )

            console.log(result.status + ": " + result.message)
        })
    }
}

console.time("main")

main()

console.timeEnd("main")
