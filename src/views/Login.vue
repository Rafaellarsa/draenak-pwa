<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <img alt="Vue logo" src="@/assets/logo.png" />

        <v-form>
          <v-text-field label="Email" required></v-text-field>
          <v-text-field label="Senha" type="password" required></v-text-field>
          <v-btn elevation="2" @click="$emit('login')">Entrar</v-btn>
          <div class="links">
            <p @click="onForgotPassword()">Esqueceu sua senha?</p>
            <router-link to="/register"
              >Não tem conta? Cadastre-se!</router-link
            >
          </div>
        </v-form>
      </v-col>
    </v-row>

    <ForgotPasswordDialog
      :is-dialog-visible="isDialogVisible"
      @close-dialog="onCloseDialog"
    />
  </v-container>
</template>

<script>
import ForgotPasswordDialog from "@/components/ForgotPasswordDialog";

export default {
  name: "Login",
  components: {
    ForgotPasswordDialog
  },
  data() {
    return {
      isDialogVisible: false
    };
  },
  methods: {
    onForgotPassword() {
      this.isDialogVisible = true;
    },
    onCloseDialog() {
      this.isDialogVisible = false;
    }
  }
};
</script>

<style scoped>
#app {
  margin: auto;
}

.col-md-4 {
  margin-left: auto;
  margin-right: auto;
}

.links {
  text-align: center;
  margin-top: 3rem;
}

p {
  margin-top: 0.5rem;
}
</style>
