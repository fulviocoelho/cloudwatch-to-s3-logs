export default interface ILogs {
    info: (...args: Array<unknown>) => void
    alert: (...args: Array<unknown>) => void
    error: (...args: Array<unknown>) => void
}