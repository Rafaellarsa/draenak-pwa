<template>
  <v-row>
    <v-col cols="12" md="4">
      <v-icon @click="$emit('leave-register')">mdi-arrow-left</v-icon>

      <v-form>
        <v-text-field label="Email" v-model="email" required></v-text-field>
        <v-text-field
          label="Nome de usuário"
          v-model="username"
          required
        ></v-text-field>
        <v-text-field
          label="Senha"
          type="password"
          v-model="password"
          required
        ></v-text-field>
        <v-text-field
          label="Confirmação da senha"
          type="password"
          v-model="passwordConfirmation"
          required
        ></v-text-field>
        <v-btn
          elevation="2"
          color="primary"
          block
          depressed
          tile
          @click="onClickSignUp()"
          >Cadastrar</v-btn
        >
      </v-form>
    </v-col>

    <MessageDialog
      :is-dialog-visible="isMessageDialogVisible"
      title="Erro"
      :message="error"
      buttonText="Okay"
      @close-dialog="isMessageDialogVisible = false"
    />
  </v-row>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import MessageDialog from "@/components/MessageDialog";

export default {
  name: "SignUp",
  components: {
    MessageDialog
  },
  data() {
    return {
      error: "",
      isMessageDialogVisible: false,
      email: "",
      username: "",
      password: "",
      passwordConfirmation: ""
    };
  },
  methods: {
    onClickSignUp() {
      if (this.password != this.passwordConfirmation) {
        this.error = "Senhas divergentes.";
        this.isMessageDialogVisible = true;
      } else if (this.password.length < 4) {
        this.error = "Quantidade de caracteres não permitido.";
        this.isMessageDialogVisible = true;
      } else {
        this.signUp(
          this.email,
          this.password,
          this.passwordConfirmation,
          this.username
        );
      }
    },
    signUp(email, password, confirmPassword, username) {
      if (
        email != null &&
        password != null &&
        confirmPassword != null &&
        username != null
      ) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(response => {
            firebase
              .auth()
              .currentUser.updateProfile({
                displayName: username,
                emailAddress: response.email
              })
              .then(() => {
                firebase
                  .database()
                  .ref("users/" + firebase.auth().currentUser.uid + "/profile")
                  .set({
                    userName: username,
                    userEmail: email
                  });

                const user = { email: email, password: password };
                this.$emit("login", user);
              })
              .catch(function(error) {
                this.error = error.message;
                this.isMessageDialogVisible = true;
                console.log(error);
              });
          });
      }
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
</style>
