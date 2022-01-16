import ITime from "../interfaces/ITime"

function time(): ITime {
    return {
        sleep: (ms: number) => {
            return new Promise( resolve => setTimeout(resolve, ms))
        }
    }
}

export { time }