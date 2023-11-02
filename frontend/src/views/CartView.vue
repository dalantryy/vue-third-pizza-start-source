<template>
  <form
      method="post"
      class="layout-form"
      @submit.prevent="submitOrder"
  >
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div v-if='cart.pizzas.length < 1' class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>

        <ul v-else class="cart-list sheet">
          <li
              class="cart-list__item"
              v-for="pizza in cart.pizzas"
          >
            <div class="product cart-list__product">
              <img src="@/assets/img/product.svg" class="product__img" width="56" height="56" alt="Капричоза">
              <div class="product__text">
                <h2>{{ pizza.name }}</h2>
                <ul>
                  <li>{{ pizza.size.name }}, на {{ pizza.dough.name }} тесте</li>
                  <li>Соус: {{ pizza.sauce.name }}</li>
                  <li>Начинка:
                    <span v-for="ingredient in pizza.ingredients">
                      <span v-if="ingredient.count > 0">
                      {{ ingredient.name }}
                        </span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <app-counter
                :count="pizza.count"
                :disabledDecrement="pizza.count === 0"
                :disabledIncrement="false"
                @decrement="cart.decrementPizza(pizza.index)"
                @increment="cart.incrementPizza(pizza.index)"
            />

            <div class="cart-list__price">
              <b>{{ pizza.price }} ₽</b>
            </div>

            <router-link to="/">
              <div class="cart-list__button">
                <button
                    type="button"
                    class="cart-list__edit"
                    @click="pizzaStore.editPizza(pizza)"
                >
                  Изменить
                </button>
              </div>
            </router-link>
          </li>
        </ul>

        <div
            v-if='cart.pizzas.length >= 1'
            class="cart__additional"
        >
          <ul class="additional-list">
            <li
                class="additional-list__item sheet"
                v-for="misc in data.misc"
            >
              <p class="additional-list__description">
                <img
                    :src="`@/assets/img/${misc.image}.svg`"
                    width="39"
                    height="60"
                    :alt="`${misc.name}`">
                <span>{{ misc.name }}</span>
              </p>

              <div class="additional-list__wrapper">
                <app-counter
                    :count="misc.count"
                    :disabledDecrement="misc.count === 0"
                    :disabledIncrement="false"
                    @decrement="cart.decrementMiscCount(misc.id)"
                    @increment="cart.incrementMiscCount(misc.id)"
                />

                <div class="additional-list__price">
                  <b>× {{ misc.price }} ₽</b>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="cart__form">
          <div class="cart-form">

            <label class="cart-form__select">
              <span class="cart-form__label">Получение заказа:</span>

              <select
                  v-model="deliveryType"
                  name="test"
                  class="select"
              >
                <option
                    value="rest"
                >
                  Заберу сам
                </option>
                <option
                    value="newAddress"
                >
                  Новый адрес
                </option>
                <option
                    v-if="auth.isAuthenticated"
                    v-for="address in profile.addresses"
                    :value="address.id"
                >
                  {{ address.name }}
                </option>
              </select>
            </label>

            <label class="input input--big-label">
              <span>Контактный телефон:</span>
              <input
                  v-model="phone"
                  type="text"
                  name="tel"
                  placeholder="+7 999-999-99-99"
              >
            </label>

            <div
                v-if="deliveryType === 'newAddress'"
                class="cart-form__address"
            >
              <span
                  v-if="deliveryType === 'newAddress'"
                  class="cart-form__label"
              >
                Новый адрес:
              </span>

              <div class="cart-form__input">
                <label class="input">
                  <span>Улица*</span>
                  <input
                      v-model="street"
                      type="text"
                      name="street"
                      :disabled="disabled"
                  />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Дом*</span>
                  <input
                      v-model="building"
                      type="text"
                      name="house"
                      :disabled="disabled"
                  />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Квартира</span>
                  <input
                      v-model="flat"
                      type="text"
                      name="apartment"
                      :disabled="disabled"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        {{ street }}
        {{ building }}
        {{ flat }}
        {{ phone }}
      </div>
    </main>
    <section class="footer">
      <div class="footer__more">
        <router-link
            :to="{ name: 'home' }"
            class="button button--border button--arrow"
        >
          Хочу еще одну
        </router-link>
      </div>
      <p class="footer__text">Перейти к конструктору<br>чтоб собрать ещё одну пиццу</p>
      <div class="footer__price">
        <b>Итого: {{ cart.getCartFullPrice }} ₽</b>
      </div>

      <div class="footer__submit">
        <button type="submit" class="button">Оформить заказ</button>
      </div>
    </section>
  </form>

  <div
      v-show="showPopup"
      class="popup">
    <router-link
        to="/"
        class="close"
        @click="cart.$reset()"
    >
      <span class="visually-hidden">Закрыть попап</span>
    </router-link>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <router-link
        to="/"
        class="button"
        @click="cart.$reset()"
      >
        Отлично, я жду!
      </router-link>
    </div>
  </div>
</template>

<script setup>
import AppCounter from "@/common/components/AppCounter.vue";
import {useCartStore, useDataStore, usePizzaStore, useProfileStore} from "../store";
import {ref, onMounted, watch} from 'vue'
import {useAuthStore} from "@/store/auth";

const cart = useCartStore()
const pizzaStore = usePizzaStore()
const profile = useProfileStore()
const data = useDataStore()
const auth = useAuthStore()

const deliveryType = ref('rest')
const street = ref('')
const building = ref('')
const flat = ref('')
const disabled = ref(false)
const phone = ref('')
const showPopup = ref(false)

watch(deliveryType, (newValue, oldValue) => {
  if (newValue !== 'newAddress' && newValue !== 'rest') {
    const res = profile.getFullAddress(newValue)

    street.value = res.street
    building.value = res.building
    flat.value = res.flat
  }
})

onMounted(async () => {
  if (auth.isAuthenticated) await profile.getAddresses()
})

async function submitOrder() {
  let address = {}
  if (deliveryType.value === 'rest') {
    address = {
      "street": 'rest',
      "building": 'rest',
      "flat": 'rest',
      "comment": "string",
    }
  } else {
    address = {
      "street": street.value,
      "building": building.value,
      "flat": flat.value,
      "comment": "string",
    }
  }
  const order = cart.getFullOrder(address, phone.value)
  try {
    await cart.createOrder(order)
    console.log('done')
  } catch(e){
    console.log('sumbit error', e.message)
  }

  showPopup.value = true
}
</script>


<style scoped>

</style>