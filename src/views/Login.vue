<template>
  <v-container>
    <SignUp
      v-if="isRegisterMode"
      @leave-register="onLeaveRegister()"
      @login="$emit('login', arguments[0])"
    />

    <v-row v-else>
      <v-col cols="12" md="4">
        <img alt="Vue logo" src="@/assets/logo.svg" />

        <v-form>
          <v-text-field
            class="custom-placeholder"
            label="Email"
            v-model="user.email"
            required
          ></v-text-field>
          <v-text-field
            class="custom-placeholder"
            label="Senha"
            type="password"
            v-model="user.password"
            required
          ></v-text-field>
          <div class="links">
            <a @click="onForgotPassword()">Esqueceu sua senha?</a>
            <a @click="onRegister()">Não tem conta? Cadastre-se!</a>
          </div>
          <v-btn color="primary" block depressed tile @click="onLogin()"
            >Entrar</v-btn
          >
        </v-form>
      </v-col>
    </v-row>

    <MessageDialog
      :is-dialog-visible="isMessageDialogVisible"
      title="Erro"
      :message="error"
      buttonText="Okay"
      @close-dialog="isMessageDialogVisible = false"
    />

    <ForgotPasswordDialog
      :is-dialog-visible="isDialogVisible"
      @close-dialog="onCloseDialog"
    />
  </v-container>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

import ForgotPasswordDialog from "@/components/Dialogs/ForgotPasswordDialog";
import MessageDialog from "@/components/Dialogs/MessageDialog";
import SignUp from "@/components/SignUp";

export default {
  name: "Login",
  components: {
    ForgotPasswordDialog,
    MessageDialog,
    SignUp
  },
  data() {
    return {
      error: "",
      isDialogVisible: false,
      isMessageDialogVisible: false,
      isRegisterMode: false,
      user: {
        email: "",
        password: ""
      }
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
    },
    onLogin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(() => {
          this.getUser();
        })
        .catch(error => {
          this.error = error.message;
          this.isMessageDialogVisible = true;
        });
    },
    getUser() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          const loggedUser = {
            email: user.email,
            username: user.displayName,
            id: user.uid
          };
          this.$store.commit("setUser", loggedUser);
          this.$store.commit("setIsLogged", true);
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style>
.v-application .primary--text {
  font-style: normal !important;
}

.v-text-field .v-label {
  margin-left: 0.6rem;
  font-style: italic;
  font-size: 14px;
  color: #b1acac !important;
  overflow: visible !important;
}
</style>
<style scoped>
.container {
  margin: auto;
  padding: 0;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 62.5vw;
}

.col-md-4 {
  margin-left: auto;
  margin-right: auto;
  padding: 0;
}

img {
  max-width: 70%;
}

.links {
  text-align: center;
  margin-bottom: 5rem;
  font-size: 13px;
}

.links a {
  display: block;
  line-height: 1.5rem;
  color: #2d9cdb !important;
}

p {
  margin-top: 0.5rem;
}
</style>
