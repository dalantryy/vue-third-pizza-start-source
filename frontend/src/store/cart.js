import { defineStore } from "pinia";

export const useCartStore = defineStore('cart', {
    state: () => ({
        pizzas: '',
        misc: '',
        phone: '',
        address: {
            street: '',
            building: '',
            flat: '',
            comment: ''
        }

    }),
    getters: {},
    actions: {}
})