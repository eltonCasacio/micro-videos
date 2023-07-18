import ValueObject from "../value-object";

class StubValueObject extends ValueObject { }

describe('ValueObject Unit Tests', () => {
    it('should set value', () => {
        let vo = new StubValueObject('string value')
        expect(vo.value).toBe('string value')

        vo = new StubValueObject({ prop1: 'value1' })
        expect(vo.value).toStrictEqual({ prop1: 'value1' })
    })

    it('should convert to string', () => {
        let vo = new StubValueObject(null)
        expect(vo + "").toBe("null")

        vo = new StubValueObject(undefined)
        expect(vo + "").toBe("undefined")

    })
})