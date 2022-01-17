/// <reference types="mocha" />
import { awaitExportTask } from '../../src/functions/AwaitExportTask'
import IIsExportTaskDone from '../../src/interfaces/IAwaitExportTaskDone'
import IOptions from '../../src/interfaces/IOptions'

const params: IIsExportTaskDone = {
    backup_bucket: '',
    days: 5,
    task_id: 's12d3a5sf1d6saf13g1a5s6df1asd1f'
}

const options: IOptions = {
    cwlogs: {
        describeLobGroups: () => {},
        exportLogs: () => {},
        isTaskDone: (task_id: string) => { return new Promise((resolve) => resolve(true)) }
    },
    date: {
        fromTodayBack: (days: number) => { return { from:10, to:10 }}
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

describe('Functions - Await Export Task', () => {
    it('SUCCESS: Task Is Done', async () => {
        await awaitExportTask(params, options)
    })
    it('SUCCESS: Await Until Task is Done', async () => {
        const { date, folder, logs, time } = options
        let called: number = 0
        const mocked_options: IOptions = {
            cwlogs: {
                describeLobGroups: () => {},
                exportLogs: () => {},
                isTaskDone: (task_id: string) => { 
                    if(called < 3) {
                        called++
                        return new Promise((resolve) => resolve(false))
                    } else {
                        return new Promise((resolve) => resolve(true))
                    }
                }
            },
            date,
            folder,
            logs,
            time
        }
        await awaitExportTask(params, mocked_options)
    })
})

