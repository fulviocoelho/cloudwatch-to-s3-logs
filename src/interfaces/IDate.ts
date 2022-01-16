export default interface IDate {
    fromTodayBack: (days: number) => { from: number; to: number }
}