/// <reference types="mocha" />
import { expect } from 'chai'
import { date } from '../../src/utils/Date'

const mock_date = { 
    getDate: () => {},
    setDate: () => {},
    getTime: () => { return 10 } 
} as unknown as Date

describe('Utils - Date', () => {
    it('SUCCESS: Initialize', () => {
        const datetime = date()
    })
    it('SUCCESS: From Today Back', async () => {
        const datetime = date({ from_date: mock_date, to_date: mock_date})
        const data_mocked = datetime.fromTodayBack(0)
        const expected_result = {
            from: 10,
            to: 10
        }
        expect(JSON.stringify(data_mocked)).to.be.eq(JSON.stringify(expected_result))
    })
})

