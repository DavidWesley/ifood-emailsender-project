export const getWeekDayFullName = (date: Date, locale: string): string => {
    return date.toLocaleDateString(locale ?? "pt-BR", { weekday: "long" })
}

export const isFirstDateInPreviousMonth = (startDate: string, endDate: string): boolean => {
    const start = new Date(startDate)
    const end = new Date(endDate)

    const startMonth = start.getUTCMonth()
    const startYear = start.getUTCFullYear()

    const endMonth = end.getUTCMonth()
    const endYear = end.getUTCFullYear()

    return (
        (endYear - startYear === 1 && Math.abs(endMonth - startMonth) === 11) ||
        (startYear === endYear && endMonth - startMonth === 1)
    )
}
