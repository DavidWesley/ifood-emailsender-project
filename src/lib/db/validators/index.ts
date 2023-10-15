export const Validators = Object.freeze({
    isValidName: (name: string): boolean => name.length >= 1 && name.length <= 100,
    isUUID: (id: string): boolean => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id),
    isEmail: (email: string): boolean => /^(?!\.)(?!.*\.\.)([A-Z0-9_+-.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i.test(email),
    isDateTimeString: (date: string): boolean => /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/.test(date),
    isBoolean: (value: string): boolean => value === "true" || value === "false",
    isNumber: (value: string): boolean => /^-?\d+$/.test(value),
    isArray: (value: string): boolean => Array.isArray(JSON.parse(value)),
})