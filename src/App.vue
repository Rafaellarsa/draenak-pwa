<template>
  <v-app>
    <div id="app">
      <div v-if="isLogged">
        <router-view></router-view>
        <bottom-menu></bottom-menu>
      </div>

      <Login @login="onLogin()" v-else />

      <div class="update-dialog" v-if="prompt">
        <div class="update-dialog__content">
          A new version is found. Refresh to load it?
        </div>
        <div class="update-dialog__actions">
          <button
            class="update-dialog__button update-dialog__button--confirm"
            @click="update"
          >
            Update
          </button>
          <button
            class="update-dialog__button update-dialog__button--cancel"
            @click="prompt = false"
          >
            Cancel
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
    "bottom-menu": BottomMenu,
  },
  methods: {
    async update() {
      this.prompt = false;
      await this.$workbox.messageSW({ type: "SKIP_WAITING" });
    },
    onLogin() {
      this.isLogged = true;
    },
  },
  data() {
    return {
      prompt: false,
      isLogged: false,
    };
  },
  created() {
    if (this.$workbox) {
      this.$workbox.addEventListener("waiting", () => {
        this.prompt = true;
      });
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
