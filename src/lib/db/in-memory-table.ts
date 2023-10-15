import { randomUUID } from "node:crypto"
import type { UUID } from "node:crypto"

// type UUID `${string}-${string}-${string}-${string}-${string}`;
type DateTimeString = `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`;

export interface InMemoryTableModel {
    id: UUID,
    createdAt: DateTimeString,
    updatedAt: DateTimeString,
}

interface InMemoryTableConfig<K> {
    columns: Array<[name: K, options: InMemoryTableColumnOptions]>
}

interface InMemoryTableColumnOptions {
    validators?: Array<(value: string) => boolean>
    defaultValue?: () => string
}

interface InMemoryModelQuery<K> {
    filters?: Partial<Record<keyof K, InMemoryModelQueryFilter>>
    columns?: Array<keyof K>
}

interface InMemoryModelQueryFilter {
    (value: string): boolean
}

export class InMemoryTable<T extends Partial<InMemoryTableModel>, U = keyof Omit<T, keyof InMemoryTableModel>> {
    private table = new Map<UUID, Map<keyof T, string>>()

    constructor(
        private readonly tableName: string,
        private config: InMemoryTableConfig<U>
    ) { }

    insert(data: Record<U, string>): UUID {
        const id = randomUUID()
        const createdAt = new Date().toISOString()
        const updatedAt = new Date().toISOString()

        const row = new Map<keyof T, string>()

        for (const [name, options] of this.config.columns) {
            if (Reflect.has(data, String(name))) {
                const value = Reflect.get(data, String(name))
                if (options.validators?.every(validator => validator(value))) row.set(name as keyof T, value)
                else throw new Error(`Invalid value for column ${name}: ${value}`)
            } else if (options.defaultValue) {
                row.set(name as keyof T, options.defaultValue())
            } else {
                throw new Error(`Missing value for column ${name}`)
            }
        }

        row
            .set("id", id)
            .set("createdAt", createdAt)
            .set("updatedAt", updatedAt)

        this.table.set(id, row)

        return id
    }

    select(query: InMemoryModelQuery<T>): Array<Map<keyof T, string>> {
        const results: Map<keyof T, string>[] = []

        this.table.forEach((row) => {
            let isValid = true
            for (const [columnName, value] of row) {
                const condition = query?.filters?.[columnName] ?? ((value: string) => Boolean(value))

                if (condition(value) === false) {
                    isValid = false
                    break
                }
            }

            if (isValid) results.push(row)
        })

        return results
    }

    update(id: UUID, data: Record<U, string>): void {
        const row = this.table.get(id)
        if (!row) throw new Error(`Row ${id} not found`)

        for (const [name, options] of this.config.columns) {
            if (Reflect.has(data, String(name))) {
                const value = Reflect.get(data, String(name))
                if (options.validators?.every(validator => validator(value))) row.set(name as keyof T, value)
                else throw new Error(`Invalid value for column ${name}: ${value}`)
            }
        }

        row.set("updatedAt", new Date().toISOString())
    }

    delete(id: UUID): void {
        this.table.delete(id)
    }

    get(id: UUID): Map<keyof T, string> | undefined {
        return this.table.get(id)
    }

    getAll(): Array<Map<keyof T, string>> {
        return Array.from(this.table.values())
    }

    getTableName(): string {
        return this.tableName
    }

    getColumnsNames(): Array<U> {
        return this.config.columns.map(([name]) => name)
    }
}

