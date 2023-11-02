<template>
  <div class="sign-form">
    <router-link :to="{name: 'home'}" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form
        action="test.html"
        method="post"
        @submit.prevent="login"
    >
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <app-input
            v-model="email"
            type="email"
            name="email"
            placeholder="user@user.com"
            :errorText="errorMessage ? 'неправильный email' : ''"
          />
        </label>
        <div class="sign-form__input-error">
          {{ validations.email.error }}
        </div>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <app-input
              type="password"
              name="pass"
              placeholder="***********"
              :errorText="errorMessage ? 'неправильный пароль' : ''"
              v-model="password"
          />
        </label>
        <div class="sign-form__input-error">
          {{ validations.email.error }}
        </div>
      </div>
      <button
          type="submit"
          class="button">Авторизоваться</button>
      <div class="server-error">
        {{ errorMessage }}
      </div>
    </form>
  </div>
</template>

<script setup>
  import { ref, watch, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from "@/store/auth";
  import { clearValidationErrors, validateFields } from "@/common/validator";
  import AppInput from "@/layouts/AppInput.vue";

  const router = useRouter()
  const auth = useAuthStore()


  const resetValidations = () => {
    return {
      email: {
        error: "",
        rules: ["required", "email"],
      },
      password: {
        error: "",
        rules: ["required"],
      },
    };
  };
  const email = ref('')
  const password = ref('')
  const errorMessage = ref(null);
  const validations = ref(resetValidations());

  const watchField = (field) => () => {
    if (errorMessage.value) {
      errorMessage.value = null;
    }
    if (validations.value[field]?.error) {
      clearValidationErrors(validations.value);
    }
  };

  watch(email, watchField("email"));
  watch(password, watchField("password"));

  const login = async () => {
    const isValid = validateFields(
        { email: email.value, password: password.value },
        validations.value
    );

    if (!isValid) {
      return;
    }

    const resMsg = await auth.login({
      email: email.value,
      password: password.value,
    });

    console.log('login', resMsg)

    if (resMsg === "success") {
      await auth.whoami();
      await router.push({ name: "home" });
    } else {
      errorMessage.value = resMsg;
    }
  };
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
  background: #ffffff url("@/assets/img/popup.svg") no-repeat center top;
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