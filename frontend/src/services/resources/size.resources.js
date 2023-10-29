import { CrudService } from "@/services/api/crud.service";

export class SizeResources extends CrudService{
    constructor() {
        super('/api/sizes');
    }

    getSizes(){
        return this.get()
    }
}