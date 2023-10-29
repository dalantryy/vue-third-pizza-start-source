<template>
  <form
      v-if="address.editNow || editAddress "
      action="test.html"
      method="post"
      class="address-form address-form--opened sheet"
      @submit.prevent="saveAddress"
  >
    <div class="address-form__header">
      <b>Адрес {{address.id}}</b>
    </div>

    <div class="address-form__wrapper">
      <div class="address-form__input">
        <label class="input">
          <span>Название адреса*</span>
          <app-input
              placeholder="Введите название адреса"
              name="addr-name"
              type="text"
              v-model="address.name"
          />
        </label>
      </div>
      <div class="address-form__input address-form__input--size--normal">
        <label class="input">
          <span>Улица*</span>
          <app-input
              placeholder="Введите название улицы"
              name="addr-street"
              type="text"
              v-model="address.street"
          />
        </label>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <label class="input">
          <span>Дом*</span>
          <app-input
              placeholder="Введите номер дома"
              name="addr-house"
              type="text"
              v-model="address.building"
          />
        </label>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <label class="input">
          <span>Квартира</span>
          <app-input
              placeholder="Введите № квартиры"
              name="addr-apartment"
              type="text"
              v-model="address.flat"
          />
        </label>
      </div>
      <div class="address-form__input">
        <label class="input">
          <span>Комментарий</span>
          <app-input
              placeholder="Введите комментарий"
              name="addr-comment"
              type="text"
              v-model="address.comment"
          />
        </label>
      </div>
    </div>

    <div class="address-form__buttons">
      <button
          type="button"
          class="button
          button--transparent"
          @click="profile.deleteAddress(address.id)"
      >
        Удалить
      </button>

      <button
          type="submit"
          class="button"
      >
        Сохранить
      </button>
    </div>
  </form>
  <div
      v-else
      class="sheet address-form"
  >
    <div class="address-form__header">
      <b>{{ address.name }}</b>
      <div
          class="address-form__edit"
          @click="editAddress = true"
      >
        <button type="button" class="icon"><span class="visually-hidden">Изменить адрес</span></button>
      </div>
    </div>
    <p>{{ address.street }}, д. {{ address.building }}, кв. {{ address.flat }}</p>
    <small>{{ address.comment }}</small>
  </div>
</template>

<script setup>
  import {ref} from "vue";
  import AppInput from "@/layouts/AppInput.vue";
  import { useAuthStore } from "@/store/auth";
  import { useProfileStore } from "@/store";

  const props = defineProps({
    address: {
      type: Object,
      required: true
    }
  })

  const auth = useAuthStore()
  const profile = useProfileStore()

  const editAddress = ref(false)
  function saveAddress() {
    props.address.userId = auth.user.id
    delete props.address.editNow
    editAddress.value = false

    profile.saveAddress(props.address)
  }
</script>

<style>
.icon {
  cursor: pointer;
  display: block;
  overflow: hidden;
  width: 32px;
  height: 32px;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  border: none;
  border-radius: 50%;
  outline: none;
  background-color: #ffffff;
  background-image: url("@/assets/img/edit.svg");
  background-repeat: no-repeat;
  background-position: center;
}
</style>