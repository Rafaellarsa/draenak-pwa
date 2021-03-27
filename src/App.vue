<template>
  <v-app>
    <div id="app">
      <div v-if="isLogged">
        <router-view></router-view>
        <bottom-menu></bottom-menu>
      </div>

      <Login v-else />

      <div class="update-dialog" v-if="prompt">
        <div class="update-dialog__content">
          Uma nova versão foi encontrada. Atualizar versão?
        </div>
        <div class="update-dialog__actions">
          <button
            class="update-dialog__button update-dialog__button--confirm"
            @click="update"
          >
            Atualizar
          </button>
          <button
            class="update-dialog__button update-dialog__button--cancel"
            @click="prompt = false"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import Login from "./views/Login";
import BottomMenu from "@/components/BottomMenu";

export default {
  name: "App",
  components: {
    Login,
    "bottom-menu": BottomMenu
  },
  data() {
    return {
      prompt: false
    };
  },
  computed: {
    isLogged() {
      return this.$store.state.user.isLogged;
    }
  },
  created() {
    if (this.$workbox) {
      this.$workbox.addEventListener("waiting", () => {
        this.prompt = true;
      });
    }
  },
  methods: {
    async update() {
      this.prompt = false;
      await this.$workbox.messageSW({ type: "SKIP_WAITING" });
    }
  }
};
</script>

<style>
#app {
  background-color: #eeeeee;
}
.update-dialog {
  position: fixed;
  left: 50%;
  bottom: 64px;
  transform: translateX(-50%);
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 12px;
  max-width: 576px;
  color: white;
  background-color: #2c3e50;
  text-align: left;
}
</style>
