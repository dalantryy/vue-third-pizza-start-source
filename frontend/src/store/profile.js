import { defineStore } from "pinia";
import addressesJSON from "@/mocks/addresses.json";
import resources from "@/services/resources";

export const useProfileStore = defineStore('profile', {
    state: () => ({
        addresses: addressesJSON,
    }),
    getters: {},
    actions: {
        async getAddresses(){
            const result = await resources.address.getAddresses()
            this.addresses = result.data
        },
        addNewAddress(){
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
        async deleteAddress(id){
            await resources.address.deleteAddress(id)
            await this.getAddresses()
        },
        async saveAddress(address){
            const result = await resources.address.getAddresses()
            const isNewAddress = result.data.find((i) => i.id === address.id)

            if(!!isNewAddress){
                await resources.address.updateAddress(address)
            } else {
                await resources.address.addAddress(address)
            }
            await this.getAddresses()
        }

    }
})