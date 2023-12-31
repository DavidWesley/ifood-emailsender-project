import type { UUID } from "node:crypto"
import { randomUUID } from "node:crypto"

export type { UUID }
export type DateTimeString = `${number}-${number}-${number}T${number}:${number}:${number}.${number}Z`

export interface InMemoryTableModel {
    id: UUID
    createdAt: DateTimeString
    updatedAt: DateTimeString
}

interface InMemoryTableConfig<K> {
    columns: Array<[name: K, options: InMemoryTableColumnOptions]>
}

interface InMemoryTableColumnOptions {
    validators?: Array<(value: string) => boolean>
    defaultValue?: () => string
    unique?: boolean
}

export interface InMemoryModelQuery<K> {
    filters?: Partial<Record<keyof K, InMemoryModelQueryFilter>>
    columns?: Array<keyof K>
}

interface InMemoryModelQueryFilter {
    (value: string): boolean
}

export class InMemoryTable<M extends Partial<InMemoryTableModel>, K = keyof Omit<M, keyof InMemoryTableModel>> {
    private table = new Map<UUID, Map<keyof M, string>>()

    /**
     * Initializes a new instance of the class.
     *
     * @param {string} tableName - The name of the table.
     * @param {InMemoryTableConfig<K>} config - The configuration for the in-memory table.
     */
    constructor(private readonly tableName: string, private config: InMemoryTableConfig<K>) {}

    /**
     * Inserts a new record into the table.
     *
     * @param {Record<K, string>} data - The data to be inserted into the table.
     * @return {UUID} - The generated UUID for the inserted record.
     */
    insert(data: Record<K, string>): UUID {
        const id = randomUUID()
        const createdAt = new Date().toISOString()
        const updatedAt = new Date().toISOString()

        const row = new Map<keyof M, string>()

        for (const [name, options] of this.config.columns) {
            if (Reflect.has(data, String(name))) {
                const value = Reflect.get(data, String(name))
                if (Boolean(options.validators?.length) === false) row.set(name as keyof M, value)
                else if (options.validators?.every((validator) => validator(value))) row.set(name as keyof M, value)
                else throw new TypeError(`Invalid value for column ${name}: ${value}`)
            } else if (options.defaultValue) {
                row.set(name as keyof M, options.defaultValue())
            } else {
                throw new Error(`Missing value for column ${name}`)
            }
        }

        row.set("id", id)
        row.set("createdAt", createdAt)
        row.set("updatedAt", updatedAt)

        this.table.set(id, row)

        return id
    }

    /**
     * Selects rows from the table that match the given query.
     *
     * @param {InMemoryModelQuery<M>} query - The query object used to filter the rows.
     * @param {number} limit - The maximum number of rows to return.
     * @return {Array<Map<keyof M, string>>} - An array of maps representing the rows that match the query.
     */
    select(query: InMemoryModelQuery<M>, limit: number = this.table.size): Array<Map<keyof M, string>> {
        const results: Map<keyof M, string>[] = []

        limit = Math.max(0, Math.min(limit, this.table.size))

        for (const line of this.table) {
            if (results.length >= limit) break

            const row = line[1]

            let isValid = true
            for (const [columnName, value] of row) {
                const condition = query?.filters?.[columnName] ?? ((value: string) => Boolean(value))

                if (condition(value) === false) {
                    isValid = false
                    break
                }
            }

            if (isValid) results.push(row)
        }

        if (query.columns?.length) {
            return results.map((row) => {
                const formattedRow = new Map<keyof M, string>()

                for (const name of query.columns ?? []) {
                    if (row.has(name)) formattedRow.set(name, row.get(name)!)
                }

                return formattedRow
            })
        }

        return results
    }

    /**
     * Updates a row in the table with the specified ID using the provided data.
     *
     * @param {UUID} id - The ID of the row to update.
     * @param {Record<K, string>} data - The data to update the row with.
     * @throws {Error} If the row with the specified ID is not found.
     * @throws {TypeError} If any of the values in the data are invalid for their respective columns.
     * @return {void}
     */
    update(id: UUID, data: Partial<Record<K, string>>): void {
        const row = this.table.get(id)
        if (!row) throw new Error(`Row ${id} not found`)

        for (const [name, options] of this.config.columns) {
            if (Reflect.has(data, String(name))) {
                const value = Reflect.get(data, String(name))!

                if (Boolean(options.validators?.length) === false) row.set(name as keyof M, value)
                else if (options.validators?.every((validator) => validator(value))) row.set(name as keyof M, value)
                else throw new TypeError(`Invalid value for column ${name}: ${value}`)
            }
        }

        row.set("updatedAt", new Date().toISOString())
    }

    /**
     * Deletes an item from the table based on the provided ID.
     *
     * @param {UUID} id - The ID of the item to delete.
     * @return {void}
     */
    delete(id: UUID): void {
        this.table.delete(id)
    }

    /**
     * Retrieves a map of properties for the given ID.
     *
     * @param {UUID} id - The ID of the object to retrieve.
     * @return {Map<keyof M, string> | undefined} - The map of properties for the given ID, or undefined if the ID does not exist.
     */
    get(id: UUID): Map<keyof M, string> | undefined {
        return this.table.get(id)
    }

    /**
     * Returns an array of maps containing the values of the table.
     *
     * @return {Array<Map<keyof M, string>>} An array of maps representing the table values.
     */
    getAll(): Array<Map<keyof M, string>> {
        return Array.from(this.table.values())
    }

    /**
     * Returns the table name.
     *
     * @return {string} The table name.
     */
    getTableName(): string {
        return this.tableName
    }

    /**
     * Retrieves the names of the columns.
     *
     * @return {Array<K>} An array of column names.
     */
    getColumnsNames(): Array<K> {
        return this.config.columns.map(([name]) => name)
    }
}
