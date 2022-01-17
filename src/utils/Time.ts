import ITime from "../interfaces/ITime"

function time(timeout: Function = setTimeout): ITime {
    return {
        sleep: (ms: number) => {
            return new Promise( resolve => timeout(resolve, ms))
        }
    }
}

export { time }