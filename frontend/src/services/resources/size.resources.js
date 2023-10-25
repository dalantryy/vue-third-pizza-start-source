import { CrudService } from "@/services/api/crud.service";

export class SizeResources extends CrudService{
    constructor() {
        super('/api/size');
    }

    getSizes(){
        return this.get()
    }
}