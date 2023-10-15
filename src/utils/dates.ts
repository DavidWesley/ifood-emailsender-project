export const getWeekDayFullName = (date: Date, locale: string): string => {
    return date.toLocaleDateString(locale ?? "pt-BR", { weekday: "long" })
}