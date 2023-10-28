# Código de Envio de Emails

Este código envia e-mails para clientes elegíveis em um determinado dia da semana. Ele inclui funções para gerar clientes e veículos fictícios e determina o dia da semana com base em uma data fornecida.

## Como usar

### Funções

#### `populateCustomers(quantity: number)`

Gera clientes fictícios e os adiciona à tabela de clientes.

- `quantity`: O número de clientes a serem gerados.

#### `populateVehicles(quantity: number)`

Gera veículos fictícios e os adiciona à tabela de veículos.

- `quantity`: O número de veículos a serem gerados.

#### `main()`

Função principal para o envio de e-mails aos clientes elegíveis. Ela gera clientes e veículos fictícios, seleciona clientes elegíveis e envia e-mails a eles em um dia específico da semana (segunda-feira).


1. Chame `populateCustomers(quantity)` para gerar clientes fictícios.
2. Chame `populateVehicles(quantity)` para gerar veículos fictícios.
3. Chame `main()` para enviar e-mails aos clientes elegíveis às segundas-feiras.

## Exemplo

```javascript
// Gere 10 clientes fictícios
populateCustomers(10);

// Gere 100 veículos fictícios
populateVehicles(100);

// Execute a função principal
main();
```

## Requisitos

- [x] Criar uma função para verificar o dia da semana atual, que será levado em conta para o disparo dos emails.

- [x] Criar uma função para montar o corpo do e-mail a ser enviado.

- [x] Criar uma função para enviar o e-mail para cada um dos clientes da lista, levando em conta a sua decisão sobre receber comunicações de marketing.

- [x] Tratar o retorno de erro ou sucesso da função "enviarEmail", de maneira a exibir uma mensagem amigável ao usuário no console.
