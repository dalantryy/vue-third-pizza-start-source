import { defineStore } from "pinia";
import resources from "@/services/resources";
import { doughSizesNorm, sizesNorm, ingredientsNorm, saucesNorm, miscNorm } from '../common/helpers/helper'

const dough = await resources.dough.getDoughs()
const sizes = await resources.size.getSizes()
const ingredients = await resources.ingredients.getIngredients()
const sauces = await resources.sauce.getSauces()
const misc = await resources.misc.getMiscs()

console.log(ingredients.data)

export const useDataStore = defineStore('data', {
    state: () => ({
        dough: dough.data.map(doughSizesNorm),
        sizes: sizes.data.map(sizesNorm),
        ingredients: ingredients.data.map(ingredientsNorm),
        sauces: sauces.data.map(saucesNorm),
        misc: misc.data.map(miscNorm)
    }),
    getters: {

    },
    actions: {}
})