<template>
  <v-container v-if="!selectedParty">
    <v-container>
      <v-row dense>
        <v-col v-for="(party, index) in parties" :key="index" cols="12">
          <v-card color="#F8F3F3" @click="onClickParty(party)">
            <div class="d-flex flex-no-wrap justify-space-between">
              <v-img
                v-if="party.partyImageURL"
                :src="party.partyImageURL"
                height="138"
                width="95"
              ></v-img>
              <v-img
                v-else
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
      @update-parties-list="getPartiesList()"
    ></NewPartyDialog>
  </v-container>
  <Party v-else :party="selectedParty" />
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";

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
      parties: [],
      selectedParty: null,
      isDialogVisible: false
    };
  },
  mounted() {
    this.getPartiesList();
  },
  methods: {
    getPartiesList() {
      this.parties = [];

      firebase
        .database()
        .ref("userParties/masters/" + this.$store.state.user.user.id)
        .once("value", snapshot => {
          snapshot.forEach(item => {
            firebase
              .database()
              .ref("parties/" + item.key)
              .once("value", snapshot2 => {
                var party = {
                  id: item.key,
                  partyImageURL: snapshot2.val().partyImageURL,
                  name: snapshot2.val().name,
                  theme: snapshot2.val().theme,
                  points: snapshot2.val().points,
                  description: snapshot2.val().description,
                  players: snapshot2.val().players,
                  masterId: snapshot2.val().masterId,
                  isMaster: true
                };
                this.parties.push(party);
              });
          });
        });

      firebase
        .database()
        .ref("userParties/players/" + this.$store.state.user.user.id)
        .once("value", snapshot => {
          snapshot.forEach(item => {
            firebase
              .database()
              .ref("parties/" + item.key)
              .once("value", snapshot2 => {
                let party = {
                  id: item.key,
                  partyImageURL: snapshot2.val().partyImageURL,
                  name: snapshot2.val().name,
                  theme: snapshot2.val().theme,
                  points: snapshot2.val().points,
                  description: snapshot2.val().description,
                  players: snapshot2.val().players,
                  masterId: snapshot2.val().masterId,
                  isMaster: false
                };
                this.parties.push(party);
              });
          });
        });
    },
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
