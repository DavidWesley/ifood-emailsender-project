import type { CustomerModel } from "@/lib/db/models/customers.ts"
import { EOL } from "node:os"

export interface SendEmailBodyProps {
    customer: CustomerModel
}

export const generateEmailBody = (data: SendEmailBodyProps): string => {
    const template = `
        Prezado(a) ${data.customer.name},

        Esperamos que este e-mail o encontre bem.
        Agradecemos por ter visitado uma de nossas lojas no último mês e por fazer parte da nossa família CarStore.

        Estamos empolgados em compartilhar com você algumas das últimas novidades e ofertas especiais em nossa ampla seleção de veículos.
        Na CarStore, estamos sempre buscando proporcionar a melhor experiência de compra de automóveis para nossos valiosos clientes.

        **Novos Veículos Em Destaque:**
        Explore nossa mais recente coleção de veículos novos, com opções para todos os gostos.
        Se você está procurando um sedã elegante, um SUV espaçoso ou um veículo esportivo de alto desempenho, temos algo para você.

        **Veículos Mais Vendidos:**
        Descubra quais veículos têm sido os favoritos de nossos clientes.
        Nossos veículos mais vendidos combinam qualidade, desempenho e excelente custo-benefício.

        **Condições Especiais de Aquisição:**
        Para tornar sua compra ainda mais acessível, estamos oferecendo condições especiais de financiamento e descontos exclusivos para clientes fiéis como você.
        Não perca a oportunidade de adquirir o veículo dos seus sonhos com as melhores condições do mercado.

        Fique à vontade para nos visitar em qualquer uma de nossas lojas ou entre em contato conosco para obter mais informações sobre nossas ofertas.
        Estamos à disposição para atendê-lo e esclarecer qualquer dúvida que você possa ter.

        Agradecemos novamente por sua lealdade à CarStore.
        Estamos ansiosos para ajudá-lo a encontrar o veículo perfeito.

        Atenciosamente,
        David Wesley - Desenvolvedor
        CarStore - O Seu Parceiro de Confiança em Automóveis
        contato@carstore.com
        `

    return template
        .split(EOL)
        .map((line) => line.trimStart())
        .join(EOL)
}
