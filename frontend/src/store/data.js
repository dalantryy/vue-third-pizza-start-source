import { defineStore } from "pinia";
import dough from '../mocks/dough.json'
import sizes from '../mocks/sizes.json'
import ingredients from '../mocks/ingredients.json'
import sauces from "../mocks/sauces.json"
import miscJSON from "@/mocks/misc.json";
import { doughSizesNorm, sizesNorm, ingredientsNorm, saucesNorm, miscNorm } from '../common/helpers/helper'
export const useDataStore = defineStore('data', {
    state: () => ({
        dough: dough.map(doughSizesNorm),
        sizes: sizes.map(sizesNorm),
        ingredients: ingredients.map(ingredientsNorm),
        sauces: sauces.map(saucesNorm),
        misc: miscJSON.map(miscNorm)
    }),
    getters: {},
    actions: {}
})