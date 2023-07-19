import { Category, CategoryProps } from './category'
import { omit } from 'lodash'
import UniqueEntityId from '../../../@seedwork/domain/value-objects/unique-entity-id.vo';

function spyUpdateMethod() {
    return jest.spyOn(Category.prototype as any, 'update')
}

function spyActivateMethod() {
    return jest.spyOn(Category.prototype as any, 'activate')
}

function spyDeactivateMethod() {
    return jest.spyOn(Category.prototype as any, 'deactivate')
}

describe("Category Unit Tests", () => {
    test('constructor of category', () => {
        let category = new Category({ name: "any_name" });
        let props = omit(category.props, 'created_at')

        expect(props).toStrictEqual({
            name: 'any_name',
            description: null,
            is_active: true,
        })
        expect(category.props.created_at).toBeInstanceOf(Date)

        category = new Category({
            name: 'any_name',
            description: 'any_description',
            is_active: false,
        })
        let created_at = new Date()
        expect(category.props).toStrictEqual({
            name: 'any_name',
            description: 'any_description',
            is_active: false,
            created_at,
        })

        category = new Category({
            name: 'any_name',
            is_active: true,
        })
        expect(category.props).toMatchObject({
            name: 'any_name',
            is_active: true,
        })
    })

    test('id property', () => {
        type CategoryData = { props: CategoryProps, id?: UniqueEntityId }
        const data: CategoryData[] = [
            { props: { name: 'any_name' } },
            { props: { name: 'any_name' }, id: null },
            { props: { name: 'any_name' }, id: undefined },
            { props: { name: 'any_name' }, id: new UniqueEntityId() },
        ]

        data.forEach(i => {
            let category = new Category({ name: i.props.name }, i.id)
            expect(category.id).not.toBeNull()
        })
    })

    test('gatters of name property', () => {
        const category = new Category({ name: 'any_name' })
        expect(category.name).toBe('any_name')
    })

    test('gatters and setters of description property', () => {
        let category = new Category({ name: 'any_name' })
        expect(category.description).toBeNull()

        category = new Category({ name: 'any_name', description: 'any_description' })
        expect(category.description).toBe('any_description')

        category = new Category({ name: 'any_name', description: 'any_description' })
        expect(category.description).toBe('any_description')

        category = new Category({ name: 'any_name', description: 'any_description' })
        category['description'] = 'other_description'
        expect(category.description).toBe('other_description')

        category['description'] = undefined
        expect(category.description).toBeNull()
    })

    test('getters and setters of is active property', () => {
        let category = new Category({ name: 'any_name' })
        expect(category.is_active).toBeTruthy()

        category = new Category({ name: 'any_name', is_active: false })
        expect(category.is_active).toBeFalsy()

        category['is_active'] = true
        expect(category.is_active).toBeTruthy()

        category['is_active'] = false
        expect(category.is_active).toBeFalsy()
    })

    test('getters and setters of created at property', () => {
        let category = new Category({ name: 'any_name' })
        expect(category.created_at).toBeInstanceOf(Date)

        category = new Category({ name: 'any_name', is_active: false })
        expect(category.is_active).toBeFalsy()

        category['is_active'] = true
        expect(category.is_active).toBeTruthy()

        category['is_active'] = false
        expect(category.is_active).toBeFalsy()
    })

    test('should update name and description', () => {
        const category = new Category({ name: 'any_name' })

        category.update('other_name', 'any_description')
        expect(category.name).toBe('other_name')
        expect(category.description).toBe('any_description')
    })

    test('should throw error if call update without name', () => {
        const category = new Category({ name: 'any_name' })
        const updateSpy = spyUpdateMethod()

        expect(() => category.update('', 'any_description')).toThrowError("name is required")
        expect(category.name).toBe('any_name')
        expect(category.description).toBeFalsy()
        expect(updateSpy).toHaveBeenCalledTimes(1)
    })

    test('should activate category', () => {
        const category = new Category({ name: 'any_name' })
        const activateSpy = spyActivateMethod()

        category.activate()
        expect(activateSpy).toHaveBeenCalledTimes(1)
        expect(category.is_active).toBeTruthy()
    })

    test('should deactivate category', () => {
        const category = new Category({ name: 'any_name' })
        const deactivateSpy = spyDeactivateMethod()

        category.deactivate()
        expect(deactivateSpy).toHaveBeenCalledTimes(1)
        expect(category.is_active).toBeFalsy()
    })
})