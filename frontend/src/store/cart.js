import { defineStore } from "pinia";
import { useDataStore } from "./data";

// const data = useDataStore()
// console.log(data.misc)
export const useCartStore = defineStore('cart', {
    state: () => ({
        pizzas: [],
        misc: [],
        phone: '',
        address: {
            street: '',
            building: '',
            flat: '',
            comment: ''
        }
    }),
    getters: {
        incrementPizza: state => {
            return item => state.pizzas.find((i) => {
                if(i.index === item){
                    i.count++
                }
            })
        },
        decrementPizza: state => {
            return item => state.pizzas.find((i) => {
                if(i.index === item){
                    i.count--
                }
            })
        },
        incrementMiscCount: state => {
            return item => state.misc.find((i) => {
                if (i.id === item) {
                    i.count++
                }
            })
        },
        decrementMiscCount: state => {
            return item => state.misc.find((i) => {
                if (i.id === item) {
                    i.count--
                }
            })
        },
        getCartFullPrice: state => {
            console.log('length', state.pizzas.length)
            const pizzaPrice = state.pizzas.length > 0 ? state.pizzas.reduce((acc, val) => acc + (val.price * val.count), 0) : 0
            const miscPrice = state.misc.reduce((acc, val) => acc + (val.price * val.count), 0)
            return pizzaPrice + miscPrice
        }
    },
    actions: {
        addPizza(pizza){
            this.pizzas[pizza.index] = pizza
        },
        createOrder(){

        }

    }
})