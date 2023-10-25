import { CrudService } from "@/services/api/crud.service";

export class SauceResources extends CrudService{
    constructor() {
        super('/api/sauce');
    }

    getSauces(){
        return this.get()
    }
}