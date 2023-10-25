import { CrudService } from "@/services/api/crud.service";

export class MiscResources extends CrudService{
    constructor() {
        super('/api/misc');

    }

    getMiscs(){
        return this.get()
    }
}