import IDate from "../interfaces/IDate"
import IDateParams from "../interfaces/IDateParams"

function date({ 
    from_date, 
    to_date 
}: IDateParams = { 
    from_date: new Date(),
    to_date: new Date()
 }): IDate {
    return {
        fromTodayBack: (days: number) => {
            from_date.setDate(from_date.getDate() - days)
            to_date.setDate(to_date.getDate())
        
            return {
                from: from_date.getTime(),
                to: to_date.getTime()
            }
        }
    }
}

export { date }