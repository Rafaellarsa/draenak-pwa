<template>
  <v-dialog v-model="isVisible" max-width="500">
    <v-card>
      <v-card-title> Esqueceu a senha? </v-card-title>
      <v-card-text>
        <v-text-field label="Email" v-model="email" required></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="$emit('close-dialog')">Cancelar</v-btn>
        <v-btn @click="onClickSendButton()">Enviar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "ForgotPasswordDialog",
  props: {
    isDialogVisible: Boolean
  },
  data() {
    return {
      email: "",
      isVisible: false
    };
  },
  watch: {
    isDialogVisible(newValue) {
      this.isVisible = newValue;
    },
    isVisible(newValue) {
      if (!newValue) {
        this.$emit("close-dialog");
      }
    }
  },
  methods: {
    onClickSendButton() {
      this.isVisible = false;
      this.resetPassword();
    },
    resetPassword() {
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .catch(errorHandle => {
          console.log(errorHandle);
        });
    }
  }
};
</script>

<style></style>
