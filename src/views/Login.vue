<template>
  <v-container>
    <Register v-if="isRegisterMode" @leave-register="onLeaveRegister()" />

    <v-row v-else>
      <v-col cols="12" md="4">
        <img alt="Vue logo" src="@/assets/logo.png" />

        <v-form>
          <v-text-field label="Email" required></v-text-field>
          <v-text-field label="Senha" type="password" required></v-text-field>
          <v-btn elevation="2" @click="$emit('login')">Entrar</v-btn>
          <div class="links">
            <a @click="onForgotPassword()">Esqueceu sua senha?</a>
            <a @click="onRegister()">Não tem conta? Cadastre-se!</a>
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
import Register from "@/components/Register";

export default {
  name: "Login",
  components: {
    ForgotPasswordDialog,
    Register
  },
  data() {
    return {
      isDialogVisible: false,
      isRegisterMode: false
    };
  },
  methods: {
    onCloseDialog() {
      this.isDialogVisible = false;
    },
    onForgotPassword() {
      this.isDialogVisible = true;
    },
    onLeaveRegister() {
      this.isRegisterMode = false;
    },
    onRegister() {
      this.isRegisterMode = true;
    }
  }
};
</script>

<style scoped>
.container {
  margin: auto;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.col-md-4 {
  margin-left: auto;
  margin-right: auto;
}

.links {
  text-align: center;
  margin-top: 3rem;
}

a {
  display: block;
}

p {
  margin-top: 0.5rem;
}
</style>
