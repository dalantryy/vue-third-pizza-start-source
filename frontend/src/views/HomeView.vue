<template>
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>
         <constructor-dough
            :dough-type="doughType"
            :result-pizza="resultPizza"
            @updateResultPizza="updateResultPizza"
         />

          <div
              v-if="sizes.length"
              class="content__diameter"
          >
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите размер</h2>

              <div class="sheet__content diameter">
                <label
                    v-for="size in sizesType"
                    :key="size.id"
                    class="diameter__input"
                    :class="`diameter__input--${size.value}`"
                >
                  <input type="radio" name="diameter" :value=size.value class="visually-hidden">
                  <span>{{ size.name }}</span>
                </label>
              </div>
            </div>
          </div>

          <constructor-ingredients
            :saucesType="saucesType"
            :ingredientsType="ingredientsType"
            :resultPizza="resultPizza"
            @updateResultPizza="updateResultPizza"
          />
          <div class="content__pizza">
            <label class="input">
              <span class="visually-hidden">Название пиццы</span>
              <input type="text" name="pizza_name" placeholder="Введите название пиццы">
            </label>

            <constructor-result
              :pizza="resultPizza"
              :update-result-pizza="updateResultPizza"
            />

            <div class="content__result">
              <p>Итого: 0 ₽</p>
              <app-button/>
            </div>
          </div>

        </div>

      </form>
    </main>
</template>

<script setup>
  //imports json
  import dough from '../mocks/dough.json'
  import sizes from '../mocks/sizes.json'
  import ingredients from '../mocks/ingredients.json'
  import sauces from "../mocks/sauces.json"

  //import helper func
  import { reactive } from 'vue'
  import { doughSizesNorm, sizesNorm, ingredientsNorm, saucesNorm } from '../common/helpers/helper'
  import AppCounter from "@/common/components/AppCounter.vue";
  import AppButton from "@/common/components/AppButton.vue";
  import ConstructorDough from "@/modules/constructor/ConstructorDough.vue";
  import ConstructorResult from "@/modules/constructor/ConstructorResult.vue";
  import ConstructorIngredients from "@/modules/constructor/ConstructorIngredients.vue";

  const doughType = dough.map(doughSizesNorm)
  const sizesType = sizes.map(sizesNorm)
  const ingredientsType = ingredients.map(ingredientsNorm)
  const saucesType = sauces.map(saucesNorm)

  // console.log('dough', doughType)
  // console.log('sizes', sizesType)
  // console.log('ingredients', ingredientsType)
  // console.log('sauces', saucesType)

  const resultPizza = reactive({
    dough: 'large',
    sauce: 'creamy',
    pizzaClass:'pizza--foundation--big-creamy'
  })

  function updateResultPizza(pizza){
    console.log('result', pizza)
    if (pizza.dough === 'light' && pizza.sauce === 'tomato'){
      resultPizza.pizzaClass = 'pizza--foundation--small-tomato'
    } else if (pizza.dough === 'large' && pizza.sauce === 'tomato'){
      resultPizza.pizzaClass = 'pizza--foundation--big-tomato'
    } else if (pizza.dough === 'large' && pizza.sauce === 'creamy') {
      resultPizza.pizzaClass = 'pizza--foundation--big-creamy'
    } else if (pizza.dough === 'light' && pizza.sauce === 'creamy'){
      resultPizza.pizzaClass = 'pizza--foundation--small-creamy'
    }
  }

</script>

<style lang="scss">
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.content {
  padding-top: 20px;
}

.content__wrapper {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  width: 920px;
  margin: 0 auto;
  padding-right: 2.12%;
  padding-bottom: 30px;
  padding-left: 2.12%;
}

.content__dough {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.content__diameter {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.content__pizza {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__constructor {
  width: 315px;
  margin-top: 25px;
  margin-right: auto;
  margin-left: auto;
}

.content__result {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  p {
    @include b-s24-h28;

    margin: 0;
  }

  button {
    margin-left: 12px;
    padding: 16px 45px;
  }
}

.sheet {
  padding-top: 15px;

  border-radius: 8px;
  background-color: $white;
  box-shadow: $shadow-light;
}

.sheet__title {
  padding-right: 18px;
  padding-left: 18px;
}

.sheet__content {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin-top: 8px;
  padding-top: 18px;
  padding-right: 18px;
  padding-left: 18px;

  border-top: 1px solid rgba($green-500, 0.1);
}

.title {
  box-sizing: border-box;
  width: 100%;
  margin: 0;

  color: $black;

  &--big {
    @include b-s36-h42;
  }

  &--small {
    @include b-s18-h21;
  }
}

.radio {
  cursor: pointer;

  span {
    @include r-s16-h19;

    position: relative;

    padding-left: 28px;

    &:before {
      @include p_center-v;

      display: block;

      box-sizing: border-box;
      width: 20px;
      height: 20px;

      content: "";
      transition: 0.3s;

      border: 1px solid $purple-400;
      border-radius: 50%;
      background-color: $white;
    }
  }

  &:hover {
    input:not(:checked):not(:disabled) + span {
      &:before {
        border-color: $purple-800;
      }
    }
  }

  input {
    display: none;

    &:checked + span {
      &:before {
        border: 6px solid $green-500;
      }
    }

    &:disabled {
      & + span {
        &:before {
          border-color: $purple-400;
          background-color: $silver-200;
        }
      }

      &:checked + span {
        &:before {
          border: 6px solid $purple-400;
        }
      }
    }
  }
}

.diameter__input {
  margin-right: 8.7%;
  margin-bottom: 20px;
  padding-top: 7px;
  padding-bottom: 6px;

  cursor: pointer;

  span {
    @include r-s16-h19;

    position: relative;

    padding-left: 46px;

    &::before {
      @include p_center_v;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-color: $green-100;
      background-image: url("@/assets/img/diameter.svg");
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  &:nth-child(3n) {
    margin-right: 0;
  }

  &--small {
    span::before {
      background-size: 18px;
    }
  }

  &--normal {
    span::before {
      background-size: 29px;
    }
  }

  &--big {
    span::before {
      background-size: 100%;
    }
  }

  &:hover {
    span::before {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + span::before {
      box-shadow: $shadow-large;
    }
  }
}

.filling {
  @include r-s14-h16;

  position: relative;

  display: block;

  padding-left: 36px;

  img {
    @include p_center-v;

    display: block;

    width: 32px;
    height: 32px;

    box-sizing: border-box;
    padding: 4px;

    border-radius: 50%;
  }
}

.input {
  display: block;

  span {
    @include r-s14-h16;

    display: block;

    margin-bottom: 4px;
  }

  input {
    @include r-s16-h19;

    display: block;

    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 8px 16px;

    transition: 0.3s;

    color: $black;
    border: 1px solid $purple-400;
    border-radius: 8px;
    outline: none;
    background-color: $white;

    font-family: inherit;

    &:focus {
      border-color: $green-500;
    }
  }

  &:hover {
    input {
      border-color: $black;
    }
  }

  &--big-label {
    display: flex;
    align-items: center;

    span {
      @include b-s16-h19;

      margin-right: 16px;

      white-space: nowrap;
    }
  }
}
</style>