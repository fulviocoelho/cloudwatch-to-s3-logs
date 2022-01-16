import IDate from "../interfaces/IDate"

function date(): IDate {
    return {
        fromTodayBack: (days: number) => {
            const from_date = new Date()
            from_date.setDate(from_date.getDate() - days)
        
            const to_date = new Date()
            to_date.setDate(to_date.getDate())
        
            return {
                from: from_date.getTime(),
                to: to_date.getTime()
            }
        }
    }
}

export { date }