/// <reference types="mocha" />
import { expect } from 'chai'
import { logs } from '../../src/utils/Logs'

describe('Utils - Logs', () => {
    it('SUCCESS: Initializes', () => {
        const log = logs()
    });
    it('SUCCESS: Logs info', () => {
        const args_to_log = ['info', 'message']
        const log = logs((...args: Array<unknown>) => {
            expect(JSON.stringify(args)).to.be.eq(JSON.stringify(args_to_log))
        })
        log.info(...args_to_log)
    })
    it('SUCCESS: Logs alert', () => {
        const args_to_log = ['alert', 'message']
        const log = logs((...args: Array<unknown>) => {
            expect(JSON.stringify(args)).to.be.eq(JSON.stringify(args_to_log))
        })
        log.alert(...args_to_log)
    })
    it('SUCCESS: Logs error', () => {
        const args_to_log = ['error', 'message']
        const log = logs((...args: Array<unknown>) => {
            expect(JSON.stringify(args)).to.be.eq(JSON.stringify(args_to_log))
        })
        log.error(...args_to_log)
    })
})