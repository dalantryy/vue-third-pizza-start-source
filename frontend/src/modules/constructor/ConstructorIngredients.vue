<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">

        <div class="ingredients__sauce">
          <p>Основной соус:</p>

          <label
              v-for="sauce in saucesType"
              :key="sauce.id"
              class="radio ingredients__input"
              @click="selectSauce(sauce.value)"
          >
            <input type="radio" name="sauce" :value='sauce.value' checked>
            <span>{{ sauce.name }}</span>
          </label>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
                v-for="ingredient in ingredientsType"
                :key="ingredient.id"
                class="ingredients__item"
            >
                      <span
                          class="filling"
                          :class="`filling--${ingredient.value}`"
                      >
                        {{ ingredient.name }}
                      </span>
              <app-counter/>
            </li>
          </ul>

        </div>

      </div>
    </div>
  </div>

</template>
<script setup>
import AppCounter from "@/common/components/AppCounter.vue";

const props = defineProps({
  saucesType:{
    type: Object,
    required: true
  },
  ingredientsType:{
    type: Object,
    required: true
  },
  resultPizza:{
    type: Object,
    required: true
  }
})

const emits = defineEmits(['updateResultPizza'])
console.log('con ing',props)

function selectSauce(item){
  console.log('select sauce', item)
  props.resultPizza.sauce = item
  emits('updateResultPizza', props.resultPizza)
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/ds-system/ds';
@import '@/assets/scss/mixins/mixins';
.ingredients__sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 14px;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 10px;
  }
}

.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}

.ingredients__filling {
  width: 100%;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
  }
}

.ingredients__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}

.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}
</style>