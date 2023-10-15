export const getWeekDayFullName = (date: Date, locale: string) => {
    return date.toLocaleDateString(locale ?? "pt-BR", { weekday: "long" })
}