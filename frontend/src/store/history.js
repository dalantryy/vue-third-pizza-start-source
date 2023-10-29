import { defineStore} from "pinia";
import resources from "@/services/resources";

export const useHistoryStore = defineStore('history', {
    state: () => ({
        orders: []
    }),
    getters: {},
    actions: {
        async getOrders(){
            const result = await resources.order.getOrders()
            this.orders = result.data

            console.log(this.orders)
        }
    }
})