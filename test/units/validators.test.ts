import { describe, expect, it } from "vitest"
import { Validators } from "@/lib/in-memory-table/validators/validators.ts"

describe("Validators", () => {
    it("isValidName should validate names correctly", () => {
        expect(Validators.isValidName("John Doe")).toBe(true)
        expect(Validators.isValidName("")).toBe(false)
        expect(Validators.isValidName("a".repeat(101))).toBe(false)
    })

    it("isUUID should validate UUIDs correctly", () => {
        expect(Validators.isUUID("123e4567-e89b-12d3-a456-426655440000")).toBe(true)
        expect(Validators.isUUID("not-a-uuid")).toBe(false)
    })

    it("isEmail should validate emails correctly", () => {
        expect(Validators.isEmail("example@example.com")).toBe(true)
        expect(Validators.isEmail("not-an-email")).toBe(false)
    })

    it("isDateTimeString should validate date-time strings correctly", () => {
        expect(Validators.isDateTimeString("2023-10-15T12:34:56.789Z")).toBe(true)
        expect(Validators.isDateTimeString("not-a-date-time")).toBe(false)
    })

    it("isBoolean should validate booleans correctly", () => {
        expect(Validators.isBoolean("true")).toBe(true)
        expect(Validators.isBoolean("false")).toBe(true)
        expect(Validators.isBoolean("not-a-boolean")).toBe(false)
    })

    it("isNumber should validate numbers correctly", () => {
        expect(Validators.isNumber("12345")).toBe(true)
        expect(Validators.isNumber("-12345")).toBe(true)
        expect(Validators.isNumber("not-a-number")).toBe(false)
    })

    it("isArray should validate arrays correctly", () => {
        expect(Validators.isArray(JSON.stringify([1, 2, 3]))).toBe(true)
        expect(Validators.isArray(JSON.stringify({ key: "value" }))).toBe(false)
    })
})
