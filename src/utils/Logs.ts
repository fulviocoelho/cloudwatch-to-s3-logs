import ILogs from '../interfaces/ILogs'

function logs(terminal: Function = console.log): ILogs {
    return {
        info: (...args: Array<unknown>) => {
            terminal(...args);       
        },
        alert: (...args: Array<unknown>) => {
            terminal(...args);
        },
        error: (...args: Array<unknown>) => {
            terminal(...args)
        }
    }
}

export { logs };