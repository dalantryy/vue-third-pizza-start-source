<template>
  <div class="layout__title">
    <h1 class="title title--big">История заказов</h1>
  </div>

  <section
      v-for="order in profile.history"
      class="sheet order"
  >
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #{{order.id}}</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: 1 ₽</span>
      </div>

      <div class="order__button">
        <button type="button" class="button button--border">Удалить</button>
      </div>
      <div class="order__button">
        <button type="button" class="button">Повторить</button>
      </div>
    </div>

    <ul class="order__list">
      <li
          v-for="pizza in profile.history"
          class="order__item"
      >
        <div
            v-for="item in pizza.pizzas"
            class="product"
        >
          <img src="img/product.svg" class="product__img" width="56" height="56" alt="Капричоза">
          <div class="product__text">
            <h2>{{item.name}}</h2>
            <ul>
              <li>{{item.size.name}}, на {{item.dough.name}} тесте</li>
              <li>Соус: {{item.sauce.name}}</li>
              <li>Начинка:
                <span v-for="ing in item.ingredients">
                  {{ing.name}}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <p class="order__price">782 ₽</p>
      </li>
    </ul>

    <ul class="order__additional">
      <li>
        <img src="img/cola.svg" width="20" height="30" alt="Coca-Cola 0,5 литра">
        <p>
          <span>Coca-Cola 0,5 литра</span>
          <b>56 ₽</b>
        </p>
      </li>
      <li>
        <img src="img/sauce.svg" width="20" height="30" alt="Острый соус">
        <span>Острый соус <br>30 ₽</span>
      </li>
      <li>
        <img src="img/potato.svg" width="20" height="30" alt="Картошка из печи">
        <p>
          <span>Картошка из печи</span>
          <b>170 ₽</b>
        </p>
      </li>
    </ul>

    <p class="order__address">Адрес доставки: Тест (или если адрес новый - писать целиком)</p>
  </section>
</template>

<script setup>
  import { useProfileStore } from "@/store";
  import { ref, onMounted } from "vue";

  const profile = useProfileStore()

  onMounted(async () => {
    await profile.getHistory()
    console.log('fullHistory', profile.fullOrder)
  })

</script>