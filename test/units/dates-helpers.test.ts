import { describe, expect, it } from "vitest"
import { getWeekDayFullName, isFirstDateInPreviousMonth } from "@/utils/dates.ts"

const isProd = process.env["NODE_ENV"] === "production"

describe.skipIf(isProd)("Date helpers", () => {
    describe("getWeekDayFullName", () => {
        it("returns the correct weekday name for a given date (en-US locale)", () => {
            expect(getWeekDayFullName(new Date("2023-10-15T12:00:00"), "en-US")).toBe("Sunday")
            expect(getWeekDayFullName(new Date("2023-10-16T12:00:00"), "en-US")).toBe("Monday")
            // TODO: Add more test cases for en-US locale
        })

        it("returns the correct weekday name for a given date (pt-BR locale)", () => {
            expect(getWeekDayFullName(new Date("2023-10-15T12:00:00"), "pt-BR")).toBe("domingo")
            expect(getWeekDayFullName(new Date("2023-10-16T12:00:00"), "pt-BR")).toBe("segunda-feira")
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
