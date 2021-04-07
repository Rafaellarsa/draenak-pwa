<template>
  <v-col>
    <v-row no-gutters>
      <h2>
        {{ party.name }}
      </h2>
    </v-row>
    <v-row class="mb-2" no-gutters>
      <p>
        Ambientação: {{ party.theme }}<br />
        Mestre: {{ party.master }}<br />
        Jogadores: {{ party.quantity }}<br />
        Pontos Iniciais: {{ party.points }}
      </p>
    </v-row>
    <v-divider></v-divider>
    <v-row class="mt-6" no-gutters>
      <h4>Ambientação</h4>
    </v-row>
    <v-row no-gutters>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat.
      </p>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "Settings",
  props: {
    party: Object
  }
};
</script>
<style scoped>
h2 {
  color: #209898;
}
</style>
