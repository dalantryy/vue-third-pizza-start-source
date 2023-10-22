import doughSizes from "@/common/data/doughSizes"
import sizes from "@/common/data/sizes"
import ingredients from "@/common/data/ingredients"
import sauces from "@/common/data/sauces"
export const doughSizesNorm = (dough) => {
    return {
        ...dough,
        value: doughSizes[dough.id]
    }
}

export const sizesNorm = (size) => {
    return {
        ...size,
        value: sizes[size.id]
    }
}

export const ingredientsNorm = (ingredient) => {
    return {
        ...ingredient,
        value: ingredients[ingredient.id],
        count: 0
    }
}

export const saucesNorm = (sauce) => {
    return {
        ...sauce,
        value: sauces[sauce.id]
    }
}

export const MOVE = 'move';
export const DATA_TRANSFER_PAYLOAD = 'payload';