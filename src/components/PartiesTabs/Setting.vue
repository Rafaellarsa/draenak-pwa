<template>
  <v-container>
    <v-col>
      <v-row no-gutters>
        <h2>
          {{ selectedParty.name }}
        </h2>
      </v-row>
      <v-row no-gutters>
        <p>
          Amientação: {{ selectedParty.theme }}<br />
          Mestre: {{ selectedParty.master }}<br />
          Jogadores: {{ selectedParty.quantity }}<br />
          Pontos Iniciais: {{ selectedParty.points }}
        </p>
      </v-row>
      <v-divider></v-divider>
      <v-row no-gutters>
        <h4>Ambientação</h4>
      </v-row>
      <v-row no-gutters>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </v-row>
    </v-col>
  </v-container>
</template>

<script></script>
<style scoped></style>
