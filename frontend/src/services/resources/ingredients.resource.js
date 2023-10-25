import { CrudService } from "@/services/api/crud.service";

export class IngredientsResource extends CrudService{
    constructor() {
        super('/api/ingredients');
    }

    getIngredients(){
        return this.get()
    }
}