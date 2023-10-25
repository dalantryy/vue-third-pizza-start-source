import {defineStore} from "pinia";
import {useDataStore} from "@/store/data";
import {useCartStore} from "./cart";
// import ingredients from "../common/data/ingredients";

const data = useDataStore()

const ingredientsArray = []
for (let ing in data.ingredients) {
    ingredientsArray.push(data.ingredients[ing])
}
console.log('ingredientsPizza', ingredientsArray)
export const usePizzaStore = defineStore('pizza', {
    state: () => ({
        index: null,
        name: '',
        doughId: 1,
        sauceId: 1,
        ingredients: ingredientsArray,
        sizeId: 1
    }),
    getters: {
        incrementCount: state => {
            return item => state.ingredients.find((i) => {
                if (i.value === item) {
                    i.count++
                }
            })
        },
        decrementCount: state => {
            return item => state.ingredients.find((i) => {
                if (i.value === item) {
                    i.count--
                }
            })
        },
        getFullPrice: state => {
            const data = useDataStore()
            const dough = data.dough.find((i) => i.id === state.doughId) ?? data.dough[0]
            const sauce = data.sauces.find((i) => i.id === state.sauceId) ?? data.sauces[0]
            const size = data.sizes.find((i) => i.id === state.sizeId) ?? data.sizes[0]

            const ingredients = state.ingredients
            const ingredientsPrice = ingredients
                .reduce((acc, val) => acc + (val.price * val.count), 0)

            return (dough.price + sauce.price + ingredientsPrice) * size.multiplier
        }
    },
    actions: {
        addToCart() {
            const cart = useCartStore()
            const data = useDataStore()

            const dough = data.dough.find((i) => i.id === this.doughId)
            const size = data.sizes.find((i) => i.id === this.sizeId)
            const sauce = data.sauces.find((i) => i.id === this.sauceId)

            const pizza = {
                index: this.index === null ? cart.pizzas.length : this.index,
                name: this.name,
                dough: dough,
                sauce: sauce,
                ingredients: this.ingredients,
                size: size,
                price: this.getFullPrice,
                count: 1
            }
            cart.addPizza(pizza)

            this.$reset()
        },
        editPizza(pizza) {
            console.log(pizza)
            // const ingredients = pizza.ingredients
            //
            // ingredients.forEach()
            // this.ingredients.find((i) => {
            //     if(i.id === )
            // })


            this.index = pizza.index
            this.name = pizza.name
            this.doughId = pizza.dough.id
            this.sauceId = pizza.sauce.id
            this.ingredients = pizza.ingredients
            this.sizeId = pizza.size.id
        }
    }
})