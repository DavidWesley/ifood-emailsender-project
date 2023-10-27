import { describe, expect, it } from "vitest"
import { sendEmail } from "@/lib/email.ts"

describe("sendEmail", () => {
    it("should return an error if no addressee is provided", () => {
        const result = sendEmail("", "Test Subject", "Test Body")

        expect(result).toEqual({
            status: "Error",
            message: "Um destinatário precisa ser fornecido ao enviar um e-mail."
        })
    })

    it("should return an error if no subject is provided", () => {
        const result = sendEmail("test@example.com", "", "Test Body")

        expect(result).toEqual({
            status: "Error",
            message: "O campo de assunto não deveria estar vazio ao enviar um e-mail."
        })
    })

    it("should return an error if no body is provided", () => {
        const result = sendEmail("test@example.com", "Test Subject", "")

        expect(result).toEqual({
            status: "Error",
            message: "O corpo da mensagem precisa ser fornecido ao enviar um e-mail."
        })
    })

    it("should return success if all fields are provided", () => {
        const result = sendEmail("test@example.com", "Test Subject", "Test Body")

        expect(result).toEqual({
            status: "Success",
            message: "E-mail enviado com sucesso!"
        })
    })
})
