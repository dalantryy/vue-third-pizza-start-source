import { defineStore } from "pinia";
import resources from "@/services/resources";
import { useAuthStore } from "@/store/auth";


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
            const pizzaPrice = state.pizzas.length > 0 ? state.pizzas.reduce((acc, val) => acc + (val.price * val.count), 0) : 0
            const miscPrice = state.misc.reduce((acc, val) => acc + (val.price * val.count), 0)
            return pizzaPrice + miscPrice
        }
    },
    actions: {
        addPizza(pizza){
            this.pizzas[pizza.index] = pizza
        },
        getFullOrder(address, phone){
            const user = useAuthStore()
            const userId = user.isAuthenticated ? user.user.id : 'anonim'
            const pizzas = this.pizzas.map((el) => {
                let ingredients = el.ingredients
                    .filter((el) => el.count > 0)
                    .map((el) => {
                        console.log(el)
                        return {
                            "ingredientId": el.id,
                            "quantity": el.count
                        }
                    })

                return {
                    "name": el.name,
                    "sauceId": el.sauce.id,
                    "doughId": el.dough.id,
                    "sizeId": el.size.id,
                    "quantity": el.count,
                    "ingredients": ingredients
                }
            })

            const order = {
                "userId": userId,
                "phone": phone,
                "address": address,
                "pizzas": pizzas,
                "misc": [
                    {
                        "miscId": 0,
                        "quantity": 0
                    }
                ]
            }

            return order
        },
        async createOrder(order){
            await resources.order.addOrder(order)
        }

    }
})