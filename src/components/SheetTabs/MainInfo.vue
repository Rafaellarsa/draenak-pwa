<template>
  <v-col>
    <v-row no-gutters>
      <h2 v-if="!isGeneralInfoEditable">
        {{ modifiedSheet.name }}
      </h2>
      <v-text-field
        class="name-field"
        v-else
        v-model="generalInfo.name"
      ></v-text-field>

      <v-spacer></v-spacer>
      <v-icon
        v-if="!isGeneralInfoEditable"
        @click="isGeneralInfoEditable = true"
        >mdi-pencil</v-icon
      >
      <v-icon v-else @click="updateGeneralInfo()" color="primary"
        >mdi-check</v-icon
      >
    </v-row>
    <p v-if="!isGeneralInfoEditable">
      Raça: {{ modifiedSheet.race }}<br />
      Altura: {{ modifiedSheet.height }}<br />
      Idade: {{ modifiedSheet.age }}<br />
      Pontos: {{ modifiedSheet.points }}<br />
      Dinheiro: {{ modifiedSheet.money }}<br />
      Mesa: {{ modifiedSheet.party }}
    </p>
    <p v-else>
      <v-text-field
        dense
        hide-details
        prefix="Raça:"
        v-model="generalInfo.race"
      ></v-text-field>
      <v-text-field
        dense
        hide-details
        prefix="Altura:"
        v-model="generalInfo.height"
      ></v-text-field>
      <v-text-field
        dense
        hide-details
        prefix="Idade:"
        v-model="generalInfo.age"
      ></v-text-field>
      <v-text-field
        dense
        hide-details
        prefix="Pontos:"
        v-model="generalInfo.points"
        type="number"
      ></v-text-field>
      <v-text-field
        dense
        hide-details
        prefix="Dinheiro:"
        v-model="generalInfo.money"
      ></v-text-field>
      <v-select
        prefix="Mesa:"
        no-data-text="Não há mesas disponíveis"
        dense
      ></v-select>
    </p>
    <v-row justify="center" no-gutters>
      <v-expansion-panels flat>
        <v-expansion-panel class="ma-1 expansion-panel">
          <v-divider></v-divider>
          <v-row justify="space-between" no-gutters>
            <v-expansion-panel-header
              color="#eeeeee"
              expand-icon="mdi-menu-down"
              class="px-0"
              style="max-width: 90%"
              >Atributos</v-expansion-panel-header
            >
            <v-icon
              v-if="!isAttributesEditable"
              @click="isAttributesEditable = true"
              >mdi-pencil</v-icon
            >
            <v-icon v-else @click="updateAttributes()" color="primary"
              >mdi-check</v-icon
            >
          </v-row>

          <v-expansion-panel-content
            v-if="!isAttributesEditable"
            color="#eeeeee"
            class="expansion-panel-content"
          >
            <div
              v-for="(attribute, index) in character.attributes"
              :key="index"
            >
              {{ attribute.name + ": " + attribute.level }}
              <v-progress-linear
                color="primary"
                :value="attribute.level * 5"
              ></v-progress-linear>
            </div>
          </v-expansion-panel-content>
          <v-expansion-panel-content
            v-else
            color="#eeeeee"
            class="expansion-panel-content"
          >
            <div
              v-for="(attribute, index) in modifiedSheet.attributes"
              :key="index"
            >
              <v-text-field
                dense
                hide-details
                :prefix="attribute.name + ':'"
                v-model="attribute.level"
              ></v-text-field>
              <v-slider
                v-model="attribute.level"
                track-color="#c4c4c4"
                min="1"
                max="20"
              ></v-slider>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel class="ma-1 expansion-panel">
          <v-divider></v-divider>

          <v-row justify="space-between" no-gutters>
            <v-expansion-panel-header
              color="#eeeeee"
              expand-icon="mdi-menu-down"
              class="px-0"
              style="max-width: 90%"
              >Competências</v-expansion-panel-header
            >
            <v-icon v-if="!isSkillsEditable" @click="isSkillsEditable = true"
              >mdi-pencil</v-icon
            >
            <v-icon v-else @click="isSkillsEditable = false" color="primary"
              >mdi-check</v-icon
            >
          </v-row>

          <v-expansion-panel-content
            color="#eeeeee"
            class="expansion-panel-content"
          >
            <div v-for="(skill, index) in character.skills" :key="index">
              {{ skill.name + ": " + skill.level }}
              <v-progress-linear
                color="primary"
                :value="skill.level * 5"
              ></v-progress-linear>
            </div>
            <div v-if="!character.skills">
              {{ character.name + " ainda não tem competências" }}
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel class="ma-1 expansion-panel">
          <v-divider></v-divider>

          <v-row justify="space-between" no-gutters>
            <v-expansion-panel-header
              color="#eeeeee"
              expand-icon="mdi-menu-down"
              class="px-0"
              style="max-width: 90%"
              >Traços</v-expansion-panel-header
            >
            <v-icon v-if="!isTraitsEditable" @click="isTraitsEditable = true"
              >mdi-pencil</v-icon
            >
            <v-icon v-else @click="isTraitsEditable = false" color="primary"
              >mdi-check</v-icon
            >
          </v-row>

          <v-expansion-panel-content
            color="#eeeeee"
            class="expansion-panel-content"
          >
            <div v-for="(trait, index) in character.traits" :key="index">
              {{ trait.name }}
            </div>
            <div v-if="!character.skills">
              {{ character.name + " ainda não tem traços" }}
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "MainInfo",
  props: {
    character: Object
  },
  data() {
    return {
      modifiedSheet: null,
      isGeneralInfoEditable: false,
      generalInfo: {
        name: "",
        race: "",
        height: "",
        age: "",
        points: "",
        money: ""
      },
      isAttributesEditable: false,
      attributes: null,
      isSkillsEditable: false,
      isTraitsEditable: false
    };
  },
  created() {
    this.modifiedSheet = this.character;
    this.generalInfo = {
      name: this.character.name,
      race: this.character.race,
      height: this.character.height,
      age: this.character.age,
      points: this.character.points,
      money: this.character.money
    };
    this.attributes = this.character.attributes;
  },
  methods: {
    updateGeneralInfo() {
      this.isGeneralInfoEditable = false;

      this.modifiedSheet.name = this.generalInfo.name;
      this.modifiedSheet.race = this.generalInfo.race;
      this.modifiedSheet.height = this.generalInfo.height;
      this.modifiedSheet.age = this.generalInfo.age;
      this.modifiedSheet.points = this.generalInfo.points;
      this.modifiedSheet.money = this.generalInfo.money;

      this.$emit("update-sheet", this.modifiedSheet);
    },
    updateAttributes() {
      this.isAttributesEditable = false;

      this.modifiedSheet.attributes = this.attributes;

      this.$emit("update-sheet", this.modifiedSheet);
    }
  }
};
</script>

<style>
.theme--light.v-input.name-field input {
  color: #5915c7;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
