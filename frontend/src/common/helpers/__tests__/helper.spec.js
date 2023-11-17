import { it, afterEach, describe, beforeEach, expect } from 'vitest'
import { doughSizesNorm, ingredientsNorm} from '../helper'
import doughSizes from "../../../mocks/dough.json";
import ingredients from "../../../mocks/ingredients.json"
describe('helper', () => {
    it('should dough value added', () => {
        const dough = doughSizes.map(doughSizesNorm)
        expect(dough[0].hasOwnProperty('value')).toBe(true)
    })

    it('should ingredients value and count added', () => {
        const newIng = ingredients.map(ingredientsNorm)
        expect(newIng[0].hasOwnProperty('value')).toBe(true)
        expect(newIng[0].hasOwnProperty('count')).toBe(true)
    })
})