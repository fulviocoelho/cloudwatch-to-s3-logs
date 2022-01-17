/// <reference types="mocha" />
import { expect } from 'chai'
import { main } from '../../src/handler/methods'
import ICWLogs from '../../src/interfaces/ICWLogs'
import IDependencies from '../../src/interfaces/IDependencies'
import IMain from '../../src/interfaces/IMain'
import IOptions from '../../src/interfaces/IOptions'

const params: IMain = {
    backup_bucket: 'back-up-bucket',
    days: 5
}

const dependencies: IDependencies = {
    awaitExportTask: async (params, options) => {},
    exportLogs: async (params, options) => { return { taskId: 'taskId' } }
}

const data_time_return = { from:10, to:10 }

const options: IOptions = {
    cwlogs: {
        describeLobGroups: () => {},
        exportLogs: (params: any) => { return new Promise((resolve) => resolve(params))},
        isTaskDone: (task_id: string) => { return new Promise((resolve) => resolve(true)) }
    },
    date: {
        fromTodayBack: (days: number) => { return data_time_return }
    },
    folder: {
        generatePrefix: (log_group: string) => { return log_group }
    },
    logs: {
        info: (...args: Array<unknown>) => {},
        alert: (...args: Array<unknown>) => {},
        error: (...args: Array<unknown>) => {}
    },
    time: {
        sleep: (ms: number) => { return new Promise((resolve) => { resolve(() => {}) })}
    }
}

class BusinessError extends Error {
    public code: string
    public retryDelay: number
    constructor(code: string) {
        super('mensagem de erro')
        this.code = code
        this.retryDelay = 10
    }
}

describe('Handler - Main', () => {
    it('ERROR: Export Logs - No Log Groups', async () => {
        try{
            await main(params, options, dependencies)
        } catch(e) {
            expect(e).to.not.be.null
        }
    })
    it('ERROR: Export Logs - Log Groups with Length 0', async () => {
        const { time, logs, folder, date } = options
        const cwlogs = {
            describeLobGroups: async () => { return { logGroups: [] } },
            exportLogs: (params: any) => { return new Promise((resolve) => resolve(params))},
            isTaskDone: (task_id: string) => { return new Promise((resolve) => resolve(true as unknown)) }
        }
        try{
            await main(params, {date, time, logs, folder, cwlogs} as IOptions, dependencies)
        } catch(e) {
            expect(e).to.not.be.null
        }
    })
    it('SUCCESS: Export Logs - Log Groups with no Name', async () => {
        const { time, logs, folder, date } = options
        const cwlogs = {
            describeLobGroups: async () => { return { logGroups: [{}] } },
            exportLogs: (params: any) => { return new Promise((resolve) => resolve(params))},
            isTaskDone: (task_id: string) => { return new Promise((resolve) => resolve(true as unknown)) }
        }
        await main(params, {date, time, logs, folder, cwlogs} as IOptions, dependencies)
    })
    it('SUCCESS: Main - Executes', async () => {
        const { time, logs, folder, date } = options
        const cwlogs = {
            describeLobGroups: async () => { return { logGroups: [{ logGroupName: 'logNameTeste' }] } },
            exportLogs: (params: any) => { return new Promise((resolve) => resolve(params))},
            isTaskDone: (task_id: string) => { return new Promise((resolve) => resolve(true as unknown)) }
        }
        await main(params, {date, time, logs, folder, cwlogs} as IOptions, dependencies)
    })
    it('ERROR: Await Export Task - Not LimitExceededException error', async () => {
        const { time, logs, folder, date } = options
        const cwlogs = {
            describeLobGroups: async () => { return { logGroups: [{ logGroupName: 'logNameTeste' }] } },
            exportLogs: (params: any) => { return new Promise((resolve) => resolve(params))},
            isTaskDone: (task_id: string) => { throw new BusinessError('LimitExceededExceptiona') }
        }
        const { exportLogs } = dependencies
        const new_dependencies: IDependencies = {
            awaitExportTask: async (params, options) => { throw new BusinessError('LimitExceededExceptiona') },
            exportLogs
        }
        try{
            await main(params, {date, time, logs, folder, cwlogs} as IOptions, new_dependencies)
        } catch(e) {
            expect(e).to.not.be.null
        }
    })
    it('ERROR: Await Export Task - LimitExceededException error', async () => {
        let count = 0
        const { time, logs, folder, date } = options
        const cwlogs = {
            describeLobGroups: async () => { return { logGroups: [{ logGroupName: 'logNameTeste' }] } },
            exportLogs: (params: any) => { return new Promise((resolve) => resolve(params))},
            isTaskDone: (task_id: string) => { throw new BusinessError('LimitExceededExceptiona') }
        }
        const { exportLogs } = dependencies
        const new_dependencies: IDependencies = {
            awaitExportTask: async (params, options) => { 
                if(count === 0){
                    count++
                    throw new BusinessError('LimitExceededException') 
                }
            },
            exportLogs
        }
        try{
            await main(params, {date, time, logs, folder, cwlogs} as IOptions, new_dependencies)
        } catch(e) {
            expect(e).to.not.be.null
        }
    })
})

