<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <img alt="Vue logo" src="@/assets/logo.png" />

        <v-form>
          <v-text-field label="Email" required></v-text-field>
          <v-text-field label="Senha" type="password" required></v-text-field>
          <v-btn elevation="2">Cadastrar</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {};
  },
  methods: {}
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
