export type SendEmailAddressee = `${string}@${string}`

// Não alterar este código, a menos que haja uma boa justificativa.

export const sendEmail = (addressee: SendEmailAddressee | string, subject: string, body: string) => {
    if (!addressee) {
        return {
            status: "Error",
            message: "Um destinatário precisa ser fornecido ao enviar um e-mail."
        }
    }

    if (!subject) {
        return {
            status: "Error",
            message: "O campo de assunto não deveria estar vazio ao enviar um e-mail."
        }
    }

    if (!body) {
        return {
            status: "Error",
            message: "O corpo da mensagem precisa ser fornecido ao enviar um e-mail."
        }
    }

    console.log(
        `
      De: news@carstore.com
      Para: ${addressee}
      Assunto: ${subject}

      ${body}

      CarStore - Aqui você encontra o seu carro novo
    `
    )

    return { status: "Success", message: "E-mail enviado com sucesso!" }
}
