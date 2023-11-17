<template>
  <app-layout>
<!--    <router-view v-slot="{ Component }">-->
<!--      <Transition name="slide" mode="out-in">-->
<!--        <component :is="Component" />-->
<!--      </Transition>-->
<!--    </router-view>-->
    <router-view />
  </app-layout>
</template>

<script setup>
  import AppLayout from "@/layouts/AppLayout.vue";
</script>

<style lang="scss">

  .slide-enter-active {
    transition: all 0.4s
  }
  .slide-enter {
    opacity: 0;
    margin-left: 90px;
  }
  .slide-leave-active {
    transition: all 0.4s;
    opacity: 0;
    margin-left: -100px;
  }

  @import "@/assets/scss/app.scss";
</style>