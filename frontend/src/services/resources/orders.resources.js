import { CrudService } from "@/services/api/crud.service";

export class OrdersResources extends CrudService{
    constructor() {
        super('/api/orders');
    }

    getOrders(){
        return this.get()
    }

    addOrder(order){
        return this.post(order)
    }

    deleteOrder(id){
        return this.delete(id)
    }
}