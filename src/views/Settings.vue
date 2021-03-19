<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-icon @click="$emit('leave-settings')">mdi-arrow-left</v-icon>

        <v-form>
          <v-text-field label="Email" readonly></v-text-field>
          <v-text-field label="Nome de usuário" required></v-text-field>
          <v-text-field
            label="Senha antiga"
            type="password"
            required
          ></v-text-field>
          <v-text-field
            label="Nova senha"
            type="password"
            required
          ></v-text-field>
          <v-text-field
            label="Confirmação da senha"
            type="password"
            required
          ></v-text-field>
          <v-btn elevation="2">Salvar</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Settings"
};
</script>

<style scoped>
#app {
  margin: auto;
}

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
</style>
