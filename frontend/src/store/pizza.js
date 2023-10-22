import { defineStore } from "pinia";
import { useDataStore } from "@/store/data";

export const usePizzaStore = defineStore('pizza', {
    state: () => ({
        index: null,
        name: '',
        doughId: 1,
        sauceId: 1,
        ingredients: [
            {
                name: 'mushrooms',
                count: 2
            },
            {
                name: 'onion',
                count: 1
            }
        ],
        sizeId: 0
    }),
    getters: {
        incrementCount: state => {
            return item => state.ingredients.find((i) => {
                if(i.name === item){
                    i.count++
                }
                return i.name === item
            })
        },
        decrementCount: state => {
            return item => state.ingredients.find((i) => {
                if(i.name === item){
                    i.count--
                }
                return i.name === item
            })
        },
        getIngredientCount: state => {
            return item => state.ingredients.find((i) => i.name === item)
        },
        getFullPrice: state => {
            const data = useDataStore()
            const dough = data.dough.find((i) => i.id === state.doughId) ?? data.dough[0]
            const sauce = data.sauces.find((i) => i.id === state.sauceId) ?? data.sauces[0]
            const size = data.sizes.find((i) => i.id === state.sizeId) ?? data.sizes[0]

            const ingredients = state.ingredients
            const ingredientsPrice = ingredients
                .map((item) => data.ingredients.find((i) => {
                    if(i.value === item.name){
                        i.count = item.count
                    }
                    return i.value === item.name
                }))
                .reduce((acc, val) => acc + (val.price * val.count), 0)

            console.log('test', ingredientsPrice)
            return (dough.price + sauce.price + ingredientsPrice) * size.multiplier
        }
    },
    actions: {}
})