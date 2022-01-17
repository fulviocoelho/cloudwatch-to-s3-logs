/// <reference types="mocha" />
import { expect } from 'chai'
import { time } from '../../src/utils/Time'

describe('Utils - Time', () => {
    it('SUCCESS: Initialize', () => {
        const timer = time()
    })
    it('SUCCESS: Sleep', async () => {
        const timer_ms = 120
        const timer = time((resolve: Function, ms: number) => {
            expect(ms).to.be.eq(timer_ms)
            resolve()
        })
        await timer.sleep(timer_ms)
    })
})

