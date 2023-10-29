<template>
  <div class="layout__title">
    <h1 class="title title--big">Мои данные</h1>
  </div>

  <div class="user">
    <picture>
      <img
          :src="auth.user.avatar"
          :alt="auth.user.name"
          width="72"
          height="72">
    </picture>
    <div class="user__name">
      <span>{{ auth.user.name }}</span>
    </div>
    <p class="user__phone">Контактный телефон: <span>{{auth.user.phone}}</span></p>
  </div>

  <div
      v-for="address in profile.addresses"
      class="layout__address"
  >
    <ProfileAddress
      :address="address"
    />
  </div>

  <div class="layout__address">

  </div>

  <div class="layout__button">
    <button
        type="button"
        class="button button--border"
        @click="profile.addNewAddress"
    >Добавить новый адрес</button>
  </div>
</template>

<script setup>
  import { useAuthStore } from "@/store/auth";
  import { useProfileStore } from "@/store";
  import {onMounted, ref, computed} from "vue";
  import ProfileAddress from "@/modules/profile/ProfileAddress.vue";

  const auth = useAuthStore()
  const profile = useProfileStore()


  onMounted(async () => {
    await profile.getAddresses()
  })
</script>