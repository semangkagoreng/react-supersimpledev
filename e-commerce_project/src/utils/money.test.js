import {it,expect,describe} from 'vitest'
import { formatMoney } from './money'


it('money should be decimal example 1999 expect $19.99', () => {
    expect(formatMoney(1919)).toBe('$19.19');
});


describe('this is standard format of cents',() => {
    it('$1.00 divided by hundred', () => {
        expect(formatMoney(212121)).toBe('$2121.21')
        expect(formatMoney(59)).toBe('$0.59')
    })
})

