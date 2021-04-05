<template>
  <v-app>
    <div id="app">
      <div v-if="isLogged">
        <TopMenu v-if="this.$router.currentRoute.name !== 'settings'" />
        <router-view class="mt-14"></router-view>
      </div>

      <Login v-else />

      <v-dialog v-model="prompt" max-width="500">
        <v-card>
          <v-card-title> Nova versão </v-card-title>
          <v-card-text>
            Uma nova versão foi encontrada. Atualizar versão?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn tile depressed @click="prompt = false">
              Cancelar
            </v-btn>
            <v-btn color="primary" tile depressed @click="update">
              Atualizar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>

<script>
import Login from "./views/Login";
import TopMenu from "@/components/TopMenu";

export default {
  name: "App",
  components: {
    Login,
    TopMenu
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
</style>
