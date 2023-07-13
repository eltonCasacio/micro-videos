import InvalidUuidError from '../../../errors/invalid-uuid.error';
import UniqueEntityId from '../unique-entity-id.vo';

function spyValidateMethod() {
    return jest.spyOn(UniqueEntityId.prototype as any, 'validate')
}

describe('UniqueEntityId Unit Tests', () => {

    beforeEach(() => jest.clearAllMocks())


    test('should throw error when uuid is invalid', () => {
        const validateSpy = spyValidateMethod()
        expect(() => new UniqueEntityId('fake id')).toThrowError(new InvalidUuidError())
        expect(validateSpy).toHaveBeenCalled()
    })

    test('constructor', () => {
        const validateSpy = spyValidateMethod()
        const uuid = 'e9b981e7-77b7-4a3f-8754-85d1e4574d75'

        let uniqueEntityId = new UniqueEntityId()
        expect(uniqueEntityId.value).toBeTruthy()
        expect(validateSpy).toHaveBeenCalled()

        uniqueEntityId = new UniqueEntityId(uuid)
        expect(uniqueEntityId.value).toBe(uuid)
        expect(validateSpy).toHaveBeenCalled()

        expect(validateSpy).toHaveBeenCalledTimes(2)
    })
})