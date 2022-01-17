/// <reference types="mocha" />
import { expect } from 'chai'
import { exportLogs } from '../../src/functions/ExportLogs'
import IExportLogGroups from '../../src/interfaces/IExportLogGroups'
import IOptions from '../../src/interfaces/IOptions'

const params: IExportLogGroups = {
    backup_bucket: 'back-up-bucket',
    days: 5,
    log_group: '/aws/lambda'
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

describe('Functions - Export Logs', () => {
    it('SUCCESS: Export Logs', async () => {
        const expected_result = {
            destination: params.backup_bucket,
            from: data_time_return.from,
            logGroupName: params.log_group,
            to: data_time_return.to,
            destinationPrefix: params.log_group
        }
        const export_log_params = await exportLogs(params, options)
        expect(JSON.stringify(export_log_params)).to.be.eq(JSON.stringify(expected_result))
    })
})

