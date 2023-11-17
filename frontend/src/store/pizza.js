import {defineStore} from "pinia";
import {useDataStore} from "@/store/data";
import {useCartStore} from "./cart";

export const usePizzaStore = defineStore('pizza', {
    state: () => ({
        index: null,
        name: '',
        doughId: 1,
        sauceId: 1,
        ingredients: [],
        sizeId: 1
    }),
    getters: {
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
        incrementCount(item) {
            const hasIngredient = this.ingredients.find((i) => {
                if (i.value === item.value) {
                    i.count++
                    return true
                }
            })

            if(!hasIngredient){
                const newIng = {
                    id: item.id,
                    name: item.name,
                    value: item.value,
                    price: item.price,
                    count: 1
                }
                this.ingredients.push(newIng)
            }
        },
        decrementCount(item) {
            const hasIngredient = this.ingredients.find((i, index) => {
                if (i.value === item.value) {
                    if(i.count === 1){
                        this.ingredients.splice(index, 1)
                    } else {
                        i.count--
                    }
                }
            })
        },
        getIngredientCount(item) {
            const hasIngredient = this.ingredients.find((i) => i.value === item.value)
            if(!!hasIngredient){
                return hasIngredient.count
            } else {
                return 0
            }
        },
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
            this.index = pizza.index
            this.name = pizza.name
            this.doughId = pizza.dough.id
            this.sauceId = pizza.sauce.id
            this.ingredients = pizza.ingredients
            this.sizeId = pizza.size.id
        }
    }
})