<template>
  <v-dialog v-model="isVisible" max-width="500">
    <v-card>
      <v-card-title> Esqueceu a senha? </v-card-title>
      <v-card-text>Ponha aqui seu email</v-card-text>
      <v-card-actions>
        <v-btn @click="$emit('close-dialog')">Cancelar</v-btn>
        <v-btn>Enviar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ForgotPasswordDialog",
  props: {
    isDialogVisible: Boolean
  },
  data() {
    return {
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
  }
};
</script>

<style></style>
