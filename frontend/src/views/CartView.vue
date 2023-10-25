<template>
  <form action="test.html" method="post" class="layout-form">
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

        <div class="cart__additional">
          <ul class="additional-list">
            <li
                class="additional-list__item sheet"
                v-for="misc in cart.misc"
            >
              <p class="additional-list__description">
                <img
                    :src="`@/assets/img/${misc.image}.svg`"
                    width="39"
                    height="60"
                    :alt="`${misc.name}`">
                <span>{{misc.name}}</span>
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
                  <b>× {{misc.price}} ₽</b>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="cart__form">
          <div class="cart-form">

            <label class="cart-form__select">
              <span class="cart-form__label">Получение заказа:</span>

              <select name="test" class="select">
                <option value="1">Заберу сам</option>
                <option value="2">Новый адрес</option>
                <option value="3">Дом</option>
              </select>
            </label>

            <label class="input input--big-label">
              <span>Контактный телефон:</span>
              <input type="text" name="tel" placeholder="+7 999-999-99-99">
            </label>

            <div class="cart-form__address">
              <span class="cart-form__label">Новый адрес:</span>

              <div class="cart-form__input">
                <label class="input">
                  <span>Улица*</span>
                  <input type="text" name="street">
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Дом*</span>
                  <input type="text" name="house">
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Квартира</span>
                  <input type="text" name="apartment">
                </label>
              </div>
            </div>
          </div>
        </div>
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
        <b>Итого: {{cart.getCartFullPrice}} ₽</b>
      </div>

      <div class="footer__submit">
        <button type="submit" class="button">Оформить заказ</button>
      </div>
    </section>
  </form>
</template>

<script setup>
import AppCounter from "@/common/components/AppCounter.vue";
import {useCartStore, usePizzaStore} from "../store";

const cart = useCartStore()
const pizzaStore = usePizzaStore()
// console.log('cart', cart.getPizza)
</script>


<style scoped>

</style>