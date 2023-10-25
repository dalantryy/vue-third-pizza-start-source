import { CrudService } from "@/services/api/crud.service";

export class AddressResource extends CrudService{
    constructor() {
        super("/api/addresses");
    }

    getAddresses(){
        return this.get()
    }
    addAddress(address){
        return this.post(address)
    }

    updateAddress(address){
        return this.put(address)
    }

    deleteAddress(id) {
        return this.delete(id);
    }
}