import InvalidUuidError from '../errors/invalid-uuid.error';
import UniqueEntityId from './unique-entity-id.vo';

describe('UniqueEntityId Unit Tests', () => {

    test('should throw error when uuid is invalid', () => {
        const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate')
        expect(() => new UniqueEntityId('fake id')).toThrowError(new InvalidUuidError())
        expect(validateSpy).toHaveBeenCalled()
    })

    test('constructor', () => {
        const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate')
        const uuid = 'e9b981e7-77b7-4a3f-8754-85d1e4574d75'

        let uniqueEntityId = new UniqueEntityId()
        expect(uniqueEntityId.id).toBeTruthy()
        expect(validateSpy).toHaveBeenCalled()

        uniqueEntityId = new UniqueEntityId(uuid)
        expect(uniqueEntityId.id).toBe(uuid)
        expect(validateSpy).toHaveBeenCalled()

        expect(validateSpy).toHaveBeenCalledTimes(2)
    })
})