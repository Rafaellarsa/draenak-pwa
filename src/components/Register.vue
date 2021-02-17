<template>
  <v-row>
    <v-col cols="12" md="4">
      <v-icon @click="$emit('leave-register')">mdi-arrow-left</v-icon>

      <v-form>
        <v-text-field label="Email" required></v-text-field>
        <v-text-field label="Nome de usuário" required></v-text-field>
        <v-text-field label="Senha" type="password" required></v-text-field>
        <v-text-field
          label="Confirmação da senha"
          type="password"
          required
        ></v-text-field>
        <v-radio-group row mandatory>
          <label>
            Como você costuma jogar RPG?
          </label>
          <div class="preference">
            <v-radio label="Mestre" color="red" value="red"></v-radio>
            <v-radio label="Jogador" color="indigo" value="indigo"></v-radio>
          </div>
          <small
            >Não se preocupe, você poderá alterar essa escolha a qualquer
            momento!</small
          >
        </v-radio-group>
        <v-btn elevation="2">Cadastrar</v-btn>
      </v-form>
    </v-col>
  </v-row>
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

.preference {
  display: block;
}
</style>
