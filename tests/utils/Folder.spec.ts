/// <reference types="mocha" />
import { expect } from 'chai'
import { folder } from '../../src/utils/Folder'

describe('Utils - Folder', () => {
    it('SUCCESS: Initialize', () => {
        const s3_folder = folder()
    })
    it('SUCCESS: Generate Prefix', async () => {
        const to_transform = '/aws/lambda'
        const s3_folder = folder()
        const transformed = s3_folder.generatePrefix(to_transform)
        expect(transformed).to.be.eq('aws-lambda')
    })
})

