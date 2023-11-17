import {defineStore} from "pinia";
import addressesJSON from "@/mocks/addresses.json";
import resources from "@/services/resources";
import {useDataStore} from "@/store";

export const useProfileStore = defineStore('profile', {
    state: () => ({
        addresses: addressesJSON,
        history: []
    }),
    getters: {
        fullOrder: (state) => {
            const data = useDataStore()
            console.log('data', data)
            console.log('orders', state.history)

            return state.history.map((el) => {
                console.log('el', el)
                const pizza = el.orderPizzas?.map((el) => {
                    return {
                        dough: data.dough.find((i) => i.id === el.doughId),
                        name: el.name,
                        id: el.id,
                        orderId: el.orderId,
                        quantity: el.quantity,
                        sauce: data.sauces.find((i) => i.id === el.sauceId),
                        size: data.sizes.find((i) => i.id === el.sizeId),
                        ingredients: el.ingredients.map((el) => {
                            return {
                                ...data.ingredients.find((i) => i.id === el.id),
                                quantity: el.quantity
                            }
                        })
                    }
                })

                const misc = el.orderMisc?.map((el) => {
                    return {
                        ...data.misc.find((i) => i.id === el.id),
                        quantity: el.quantity
                    }
                })
                return {
                    pizzas: {
                        ...pizza,
                        ...misc
                    }
                }
            })
        }
    },
    actions: {
        async getAddresses() {
            const result = await resources.address.getAddresses()
            this.addresses = result.data
        },
        addNewAddress() {
            const newAddress = {
                "name": "",
                "userId": this.addresses.length + 1,
                "street": "",
                "building": "",
                "flat": "",
                "comment": "",
                editNow: true
            }

            this.addresses.push(newAddress)
        },
        async deleteAddress(id) {
            await resources.address.deleteAddress(id)
            await this.getAddresses()
        },
        async saveAddress(address) {
            const result = await resources.address.getAddresses()
            const isNewAddress = result.data.find((i) => i.id === address.id)

            if (!!isNewAddress) {
                await resources.address.updateAddress(address)
            } else {
                await resources.address.addAddress(address)
            }
            await this.getAddresses()
        },
        getFullAddress(id) {
            const res = this.addresses.find((i) => i.id === id)
            return res
        },
        async getHistory(){
            const res = await resources.order.getOrders()
            this.history = res.data
        }
    }
})