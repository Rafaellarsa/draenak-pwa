<template>
  <v-container v-if="!selectedParty">
    <v-container>
      <v-row dense>
        <v-col v-for="(party, index) in parties" :key="index" cols="12">
          <v-card color="#F8F3F3" @click="onClickParty(party)">
            <div class="d-flex flex-no-wrap justify-space-between">
              <v-img
                src="@/assets/avatar-placeholder.gif"
                height="138"
                width="95"
              ></v-img>

              <div style="width: 80%">
                <v-card-title
                  class="headline"
                  v-text="party.name"
                ></v-card-title>

                <v-card-text>
                  {{ party.theme }}<br />
                  {{ party.quantity + " jogadores" }}<br />
                  {{ party.points + " pontos" }}
                </v-card-text>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-btn
      @click="isDialogVisible = true"
      class="mx-2 mb-1"
      fab
      small
      fixed
      bottom
      right
      color="secondary"
    >
      <v-icon>
        mdi-plus
      </v-icon>
    </v-btn>

    <NewPartyDialog
      :is-dialog-visible="isDialogVisible"
      @close-dialog="isDialogVisible = false"
    ></NewPartyDialog>
    <!-- @update-parties-list="getSheetsList()" -->
  </v-container>
  <Party v-else :party="selectedParty" />
</template>

<script>
import Party from "@/components/Party";
import NewPartyDialog from "@/components/Dialogs/NewPartyDialog";

export default {
  name: "PartiesList",
  components: {
    Party,
    NewPartyDialog
  },
  data() {
    return {
      color: "#209898",
      parties: [
        {
          name: "Rolezinho virtual",
          theme: "Fantasia Medieval",
          master: "Vittinho do SUS",
          quantity: 2,
          points: 120
        },
        {
          name: "Nightcity",
          theme: "Cyberpunk",
          master: "Moranguinho Candelabro",
          quantity: 3,
          points: 200
        },
        {
          name: "Castelo Ratibum",
          theme: "Fantasia",
          master: "Maraena Madalena",
          quantity: 4,
          points: 135
        },
        {
          name: "Terra Média",
          theme: "Alta fantasia",
          master: "Jodoca Aloma",
          quantity: 4,
          points: 230
        }
      ],
      selectedParty: null,
      isDialogVisible: false
    };
  },
  methods: {
    onClickParty(party) {
      this.selectedParty = party;
    }
  }
};
</script>

<style scoped>
h1 {
  color: #209898;
}

.v-image {
  border-top-left-radius: 15px !important;
  border-bottom-left-radius: 15px !important;
}

.v-card {
  border-radius: 15px !important;
}

.v-application .headline {
  font-size: 1.125rem !important;
  font-weight: 500 !important;
  padding-bottom: 0 !important;
}
</style>
