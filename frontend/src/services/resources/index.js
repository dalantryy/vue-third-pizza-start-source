import { AddressResource } from "@/services/resources/address.resource";
import { AuthResource } from "@/services/resources/auth.resources";
import { DoughResource } from "@/services/resources/dough.resource";
import { IngredientsResource } from "@/services/resources/ingredients.resource";
import { MiscResources } from "@/services/resources/misc.resources";
import { OrdersResources } from "@/services/resources/orders.resources";
import { SauceResources } from "@/services/resources/sauce.resources";
import { SizeResources } from "@/services/resources/size.resources";

export default {
    address: new AddressResource(),
    auth: new AuthResource(),
    dough: new DoughResource(),
    ingredients: new IngredientsResource(),
    misc: new MiscResources(),
    order: new OrdersResources(),
    sauce: new SauceResources(),
    size: new SizeResources(),
};