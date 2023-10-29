import { CrudService } from "@/services/api/crud.service";

export class SauceResources extends CrudService{
    constructor() {
        super('/api/sauces');
    }

    getSauces(){
        return this.get()
    }
}