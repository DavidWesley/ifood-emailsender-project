import { describe, expect, it } from "vitest"
import { getWeekDayFullName, isFirstDateInPreviousMonth } from "@/utils/dates.ts"

const isProd = process.env["NODE_ENV"] === "production"

describe.skipIf(isProd)("Date helpers", () => {
    describe("getWeekDayFullName", () => {
        it("returns the correct weekday name for a given date (en-US locale)", () => {
            expect(getWeekDayFullName(new Date("2023-10-15"), "en-US")).toBe("Saturday")
            expect(getWeekDayFullName(new Date("2023-10-16"), "en-US")).toBe("Sunday")
            // TODO: Add more test cases for en-US locale
        })

        it("returns the correct weekday name for a given date (pt-BR locale)", () => {
            expect(getWeekDayFullName(new Date("2023-10-15"), "pt-BR")).toBe("sábado")
            expect(getWeekDayFullName(new Date("2023-10-16"), "pt-BR")).toBe("domingo")
            // TODO: Add more test cases for pt-BR locale
        })
    })

    describe("isFirstDateInPreviousMonth", () => {
        it("returns true when the first date is in the previous month", () => {
            expect(isFirstDateInPreviousMonth("2023-09-01", "2023-10-01")).toBe(true)
            expect(isFirstDateInPreviousMonth("2023-10-01", "2023-11-01")).toBe(true)
            expect(isFirstDateInPreviousMonth("2022-12-10", "2023-01-25")).toBe(true)
        })
    })
})
