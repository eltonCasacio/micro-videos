import { Category } from './category'
import { omit } from 'lodash'

describe("Category Unit Tests", () => {
    test('constructor of category', () => {
        let category = new Category({ name: "any_name" });
        let props = omit(category.props, 'created_at')

        expect(props).toStrictEqual({
            name: 'any_name',
            description: null || undefined,
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
})