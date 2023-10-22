<template>
  <div class="sign-form">
    <router-link :to="{name: 'home'}" class="close">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form action="test.html" method="post">
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <input
              type="email"
              name="email"
              placeholder="example@mail.ru"
              v-model="email"
          />
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <input
              type="password"
              name="pass"
              placeholder="***********"
              v-model="password"
          />
        </label>
      </div>
      <button
          type="submit"
          class="button">Авторизоваться</button>
    </form>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const email = ref('')
  const password = ref('')
</script>

<style scoped>
.sign-form {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 10;
  display: block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 455px;
  padding-top: 146px;
  padding-right: 32px;
  padding-bottom: 32px;
  padding-left: 32px;
  background: #ffffff url("../img/popup.svg") no-repeat center top;
  -webkit-box-shadow: 0 4px 8px rgba(0, 0, 0, 0.04), 0 0 2px rgba(0, 0, 0, 0.06), 0 0 1px rgba(0, 0, 0, 0.04);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.04), 0 0 2px rgba(0, 0, 0, 0.06), 0 0 1px rgba(0, 0, 0, 0.04);
}

.sign-form button {
  margin: 0 auto;
  padding: 16px 14px;
}

.sign-form__title {
  margin-bottom: 24px;
  text-align: center;
}

.sign-form__input {
  margin-bottom: 16px;
}
</style>