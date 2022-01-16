export default interface ITime {
    sleep: (ms: number) => Promise<Function>
}