import { v4 as uuidv4, validate } from 'uuid';
import InvalidUuidError from '../../errors/invalid-uuid.error';
import ValueObject from './value-object';

export default class UniqueEntityId extends ValueObject<string> {

    constructor(readonly id?: string) {
        super(id || uuidv4())
        this.validate()
    }

    private validate() {
        const isValid = validate(this.value)
        if (!isValid)
            throw new InvalidUuidError()
    }
}