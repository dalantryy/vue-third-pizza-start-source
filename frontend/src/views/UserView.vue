<template>
  <sidebar-layout>
    <template #sidebar>
      <router-link
          :to="{name: 'orders'}"
          class="layout__link"
          :class="{'layout__link--active' : currentRoute === 'orders'}"
      >
        История заказов
      </router-link>

      <router-link
          :to="{name: 'profile'}"
          class="layout__link"
          :class="{'layout__link--active' : currentRoute === 'profile'}"
      >
        Мои данные
      </router-link>
    </template>

    <router-view />
  </sidebar-layout>
</template>
<script setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute()

const currentRoute = computed(() => route.name)
</script>